"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.logoutUser = exports.updateUser = exports.loginUser = exports.completeRegistration = exports.verifyRegistrationOTP = exports.requestRegistrationOTP = void 0;
const userService = __importStar(require("../services/userServices"));
const database_1 = __importDefault(require("../config/database"));
const otpService = __importStar(require("../services/otpService"));
const emailService = __importStar(require("../services/emailServices"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const REGISTRATION_TOKEN_SECRET = process.env['JWT_SECRET'] || 'temp_secret';
const requestRegistrationOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const otp = await otpService.generateAndSaveOTP(email);
        await emailService.sendOTPEmail(email, otp);
        return res.status(200).json({ message: 'Verification code sent to email.' });
    }
    catch (error) {
        console.error('OTP Request Error:', error);
        return res.status(500).json({ message: 'Error sending verification code' });
    }
};
exports.requestRegistrationOTP = requestRegistrationOTP;
const verifyRegistrationOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        await otpService.verifySecureOTP(email, otp);
        // Generate a temporary verification token (valid for 15 mins)
        const verificationToken = jsonwebtoken_1.default.sign({ email }, REGISTRATION_TOKEN_SECRET, { expiresIn: '15m' });
        return res.status(200).json({
            message: 'OTP verified successfully.',
            verificationToken
        });
    }
    catch (error) {
        console.error('OTP Verification Error:', error);
        return res.status(400).json({ message: error.message });
    }
};
exports.verifyRegistrationOTP = verifyRegistrationOTP;
const completeRegistration = async (req, res) => {
    try {
        const { name, password, tenantName, role, phone, verificationToken } = req.body;
        let email;
        try {
            const decoded = jsonwebtoken_1.default.verify(verificationToken, REGISTRATION_TOKEN_SECRET);
            email = decoded.email;
        }
        catch (err) {
            return res.status(401).json({ message: 'Invalid or expired verification token.' });
        }
        const avatarUrl = req.file?.path;
        const result = await database_1.default.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: { name: tenantName || `${name}'s Workspace` }
            });
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: role || 'ADMIN',
                    tenantId: tenant.id,
                    avatar: avatarUrl,
                    phone: phone,
                    isEmailVerified: true
                }
            });
            // Delete the OTP record as it's no longer needed
            await tx.verificationOTP.delete({ where: { email } }).catch(() => { });
            return { user, tenant };
        });
        const { password: _, ...userWithoutPassword } = result.user;
        return res.status(201).json({
            message: 'Registration successful!',
            user: userWithoutPassword
        });
    }
    catch (error) {
        console.error('Final Registration Error:', error);
        return res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
};
exports.completeRegistration = completeRegistration;
//Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role, tenantId: user.tenantId }, REGISTRATION_TOKEN_SECRET, { expiresIn: '1d' });
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                tenantId: user.tenantId,
                avatar: user.avatar,
                phone: user.phone,
                isEmailVerified: user.isEmailVerified
            }
        });
    }
    catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.loginUser = loginUser;
const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, password, role, phone } = req.body;
        const updateData = {
            name,
            email,
            role,
            phone,
            avatar: req.file?.path
        };
        // Hash password if it's being updated
        if (password) {
            updateData.password = await bcrypt_1.default.hash(password, 10);
        }
        const updatedUser = await userService.updateUser(userId, updateData);
        // Exclude password from response
        const { password: _, ...userWithoutPassword } = updatedUser;
        return res.status(200).json({
            message: 'User updated successfully',
            user: userWithoutPassword
        });
    }
    catch (error) {
        console.error('Update User Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.updateUser = updateUser;
const logoutUser = async (_req, res) => {
    return res.status(200).json({ message: 'Logged out successfully' });
};
exports.logoutUser = logoutUser;
const findUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password: _, ...userWithoutPassword } = user;
        return res.status(200).json({
            message: 'User found successfully',
            user: userWithoutPassword
        });
    }
    catch (error) {
        console.error('Find User Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=userController.js.map