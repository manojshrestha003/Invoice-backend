import { Request, Response } from 'express';
import * as userService from '../services/userServices';
import prisma from '../config/database';
import { Prisma } from '@prisma/client';

import * as otpService from '../services/otpService';
import * as emailService from '../services/emailServices';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const REGISTRATION_TOKEN_SECRET = process.env['JWT_SECRET'] || 'temp_secret';
const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'] || '';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);


export const requestRegistrationOTP = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const otp = await otpService.generateAndSaveOTP(email);
        await emailService.sendOTPEmail(email, otp);

        return res.status(200).json({ message: 'Verification code sent to email.' });
    } catch (error: any) {
        console.error('OTP Request Error:', error);
        return res.status(500).json({ message: 'Error sending verification code' });
    }
};

export const verifyRegistrationOTP = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        await otpService.verifySecureOTP(email, otp);

        // Generate a temporary verification token (valid for 15 mins)
        const verificationToken = jwt.sign({ email }, REGISTRATION_TOKEN_SECRET, { expiresIn: '15m' });

        return res.status(200).json({
            message: 'OTP verified successfully.',
            verificationToken
        });
    } catch (error: any) {
        console.error('OTP Verification Error:', error);
        return res.status(400).json({ message: error.message });
    }
};

export const completeRegistration = async (req: Request, res: Response) => {
    try {
        const { name, password, tenantName, role, phone, verificationToken } = req.body;
        let email: string;
        try {
            const decoded = jwt.verify(verificationToken, REGISTRATION_TOKEN_SECRET) as { email: string };
            email = decoded.email;
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired verification token.' });
        }

        const avatarUrl = (req as any).file?.path;

        const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const tenant = await tx.tenant.create({
                data: { name: tenantName || `${name}'s Workspace` }
            });

            const hashedPassword = await bcrypt.hash(password, 10);
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

    } catch (error: any) {
        console.error('Final Registration Error:', error);
        return res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
};


//Login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await userService.findUserByEmail(email);
        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, tenantId: user.tenantId },
            REGISTRATION_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

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
    } catch (error: any) {
        console.error('Login Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { name, email, password, role, phone } = req.body;

        const updateData: any = {
            name,
            email,
            role,
            phone,
            avatar: (req as any).file?.path
        };

        // Hash password if it's being updated
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await userService.updateUser(userId, updateData);

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = updatedUser;

        return res.status(200).json({
            message: 'User updated successfully',
            user: userWithoutPassword
        });
    } catch (error: any) {
        console.error('Update User Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const logoutUser = async (_req: Request, res: Response) => {
    return res.status(200).json({ message: 'Logged out successfully' });
};

export const findUserByEmail = async (req: Request, res: Response) => {
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

    } catch (error: any) {
        console.error('Find User Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const googleLogin = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        // 1. Verify the token with Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        // Extract the user details Google returns securely
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return res.status(400).json({ message: 'Invalid Google token payload' });
        }
        const { email, name, picture } = payload;
        // 2. Check if user already exists
        let user = await userService.findUserByEmail(email);
        // 3. If User doesn't exist, we auto-register them
        if (!user) {
            // Auto register them like in `completeRegistration`, generating a Tenant
            const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                const tenant = await tx.tenant.create({
                    data: { name: `${name}'s Workspace` }
                });
                const newUser = await tx.user.create({
                    data: {
                        name: name as string,
                        email: email,
                        // Null password because they are authenticating via Google
                        password: null,
                        role: 'ADMIN',
                        tenantId: tenant.id,
                        avatar: picture || null,
                        isEmailVerified: true
                    }
                });
                return newUser;
            });
            user = result;
        }
        // 4. Issue standard JWT token exactly like the normal login logic
        const jwtToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role, tenantId: user.tenantId },
            REGISTRATION_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        return res.status(200).json({
            message: 'Google login successful',
            token: jwtToken,
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
    } catch (error: any) {
        console.error('Google Login Error:', error);
        return res.status(500).json({ message: 'Google Authentication failed. Please try again.' });
    }
};