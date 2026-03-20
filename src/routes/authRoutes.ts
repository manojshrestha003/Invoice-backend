import { Router } from 'express';
import * as userController from '../controllers/userController';
import { registerSchema } from '../validations/authValidation';
import { validate } from '../middlewares/validationMiddleware';
import { upload } from '../config/cloudinary';

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               tenantName:
 *                 type: string
 *               tenantId:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MANAGER, EMPLOYEE]
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User with this email already exists or validation error
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', upload.single('avatar'),
    validate(registerSchema), userController.registerUser);

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

export default router;
