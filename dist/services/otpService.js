"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySecureOTP = exports.generateAndSaveOTP = void 0;
// src/services/otpService.ts
const database_1 = __importDefault(require("../config/database"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const MAX_ATTEMPTS = 5;
/**
 * Generates a 6-digit OTP, hashes it, and saves it to the database.
 */
const generateAndSaveOTP = async (email) => {
    // 1. Generate a random 6-digit code
    const otp = crypto_1.default.randomInt(100000, 999999).toString();
    // 2. Hash the OTP for security
    const otpHash = await bcrypt_1.default.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 60 * 1000); // 10 minutes
    // 3. Upsert: update existing OTP or create a new one
    await database_1.default.verificationOTP.upsert({
        where: { email },
        update: { otpHash, attempts: 0, expiresAt },
        create: { email, otpHash, expiresAt },
    });
    return otp; // Return the plain text OTP to send it via email
};
exports.generateAndSaveOTP = generateAndSaveOTP;
/**
 * Verifies the OTP by comparing the hash and checking attempts.
 */
const verifySecureOTP = async (email, plainOtp) => {
    const record = await database_1.default.verificationOTP.findUnique({ where: { email } });
    if (!record)
        throw new Error('OTP not found for this email.');
    if (new Date() > record.expiresAt)
        throw new Error('OTP has expired.');
    if (record.attempts >= MAX_ATTEMPTS)
        throw new Error('Too many failed attempts. Please request a new code.');
    const isMatch = await bcrypt_1.default.compare(plainOtp, record.otpHash);
    if (!isMatch) {
        await database_1.default.verificationOTP.update({
            where: { email },
            data: { attempts: { increment: 1 } }
        });
        throw new Error('OTP is not matched ');
    }
    return true; // Verification passed!
};
exports.verifySecureOTP = verifySecureOTP;
//# sourceMappingURL=otpService.js.map