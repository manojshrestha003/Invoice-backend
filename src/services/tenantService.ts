import prisma from "../config/database";


export const createTenant = async (name: string, plan = "Free") => {
  return prisma.tenant.create({ data: { name, plan } });
};

export const getAllTenants = async () => {
  return prisma.tenant.findMany();
};
