import bcrypt from 'bcrypt';
import prisma from '../config/database';

export const createUser = async (
    name: string,
    email: string,
    password: string,
    role: string,
    tenantId?: string,
    avatar?: string
) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
            avatar,
            tenantId: tenantId || null,
        }
    });
};



export const updateUser = async (id: string, data: any) => {
    return prisma.user.update({
        where: { id },
        data
    });
};

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email }
    });
};
