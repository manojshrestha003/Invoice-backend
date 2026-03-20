import { Request, Response } from 'express';
import * as userService from '../services/userServices';
import prisma from '../config/database';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, tenantName, tenantId, role } = req.body;

        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        
        let finalTenantId = tenantId || null;

        if (tenantName && !finalTenantId) {
            const newTenant = await prisma.tenant.create({
                data: { name: tenantName }
            });
            finalTenantId = newTenant.id;
        }

        // 3. Create the user
        const avatarUrl = (req.file as any)?.path; // Cloudinary URL
        const newUser = await userService.createUser(
            name,
            email,
            password,
            role,
            finalTenantId || undefined,
            avatarUrl
        );

        // 4. Return user (excluding password)
        const { password: _, ...userWithoutPassword } = newUser;
        return res.status(201).json({
            message: 'User registered successfully',
            user: userWithoutPassword
        });

    } catch (error: any) {
        console.error('Registration Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const findUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await userService.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...userWithoutPassword } = user;

        return res.status(200).json({
            message: 'User found successfully',
            user: userWithoutPassword
        });

    } catch (error: any) {
        console.error('Find User Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};