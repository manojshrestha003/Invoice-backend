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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("../controllers/userController"));
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const cloudinary_1 = require("../config/cloudinary");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authValidation_1 = require("../validations/authValidation");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /auth/register/request:
 *   post:
 *     summary: Step 1 - Request an OTP for registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to email
 */
router.post('/register/request', (0, validationMiddleware_1.validate)(authValidation_1.requestOtpSchema), userController.requestRegistrationOTP);
/**
 * @openapi
 * /auth/register/verify:
 *   post:
 *     summary: Step 2 - Verify OTP and get Registration Token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified, returns verificationToken
 */
router.post('/register/verify', (0, validationMiddleware_1.validate)(authValidation_1.verifyOtpSchema), userController.verifyRegistrationOTP);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login and get JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', (0, validationMiddleware_1.validate)(authValidation_1.loginSchema), userController.loginUser);
/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', userController.logoutUser);
/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Complete registration with avatar
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               tenantName:
 *                 type: string
 *               verificationToken:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MANAGER, EMPLOYEE]
 *               phone:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', cloudinary_1.upload.single('avatar'), (0, validationMiddleware_1.validate)(authValidation_1.registerSchema), userController.completeRegistration);
/**
 * @openapi
 * /auth/findUserByEmail:
 *   get:
 *     summary: Find user by email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found successfully
 *       404:
 *         description: User not found
 */
router.get('/findUserByEmail', userController.findUserByEmail);
/**
 * @openapi
 * /auth/updateUser:
 *   patch:
 *     summary: Update user profile (Authenticated)
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MANAGER, EMPLOYEE]
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch('/updateUser', authMiddleware_1.authenticate, cloudinary_1.upload.single('avatar'), userController.updateUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map