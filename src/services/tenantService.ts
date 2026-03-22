import prisma from "../config/database";


export const createTenant = async (data: { 
  name: string; 
  plan?: string; 
  logo?: string; 
  address?: string; 
  phone?: string; 
  businessEmail?: string; 
  website?: string; 
  taxId?: string; 
  currency?: string; 
  status?: string; 
}) => {
  return prisma.tenant.create({ data });
};

export const getAllTenants = async (skip: number = 0, take: number = 10) => {
  const [tenants, total] = await prisma.$transaction([
    prisma.tenant.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.tenant.count(),
  ]);
  return { tenants, total };
};

export const updateTenant = async (id: string, data: { 
  name?: string; 
  plan?: string;
  logo?: string; 
  address?: string; 
  phone?: string; 
  businessEmail?: string; 
  website?: string; 
  taxId?: string; 
  currency?: string; 
  status?: string; 
}) => {
  return prisma.tenant.update({
    where: { id },
    data
  });
};
