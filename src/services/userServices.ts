import prisma from "../config/database";

export const createUser = async (name: string, email: string, password: string, tenantId: string) => {
    return prisma.user.create({
        data: {
            name,
            email,
            password,
            tenantId
        }
    })
}
