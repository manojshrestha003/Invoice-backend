import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validate } from '../middlewares/validationMiddleware';
import { upload } from '../config/cloudinary';
import { authenticate } from '../middlewares/authMiddleware';
import { requestOtpSchema, verifyOtpSchema, registerSchema, loginSchema, googleLoginSchema } from '../validations/authValidation';

const router = Router();

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
router.post('/register/request', validate(requestOtpSchema), userController.requestRegistrationOTP);

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
router.post('/register/verify', validate(verifyOtpSchema), userController.verifyRegistrationOTP);

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
router.post('/login', validate(loginSchema), userController.loginUser);

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
router.post('/register', upload.single('avatar'),
    validate(registerSchema), userController.completeRegistration);

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
router.patch('/updateUser', authenticate, upload.single('avatar'), userController.updateUser);

/**
 * @openapi
 * /auth/google:
 *   post:
 *     summary: Login or Register with Google OAuth
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/google', validate(googleLoginSchema), userController.googleLogin);

export default router;
