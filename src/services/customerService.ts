import prisma from "../config/database";

export const createCustomer = async (data: { 
  name: string; 
  email?: string; 
  phone?: string; 
  address?: string; 
  tenantId: string;
}) => {
  return prisma.customer.create({ data });
};

export const getAllCustomers = async (tenantId: string, skip: number = 0, take: number = 10) => {
  const [customers, total] = await prisma.$transaction([
    prisma.customer.findMany({
      where: { tenantId },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.customer.count({ where: { tenantId } }),
  ]);
  return { customers, total };
};

export const getCustomerById = async (id: string, tenantId: string) => {
  return prisma.customer.findUnique({
    where: { id, tenantId },
  });
};

export const updateCustomer = async (id: string, tenantId: string, data: { 
  name?: string; 
  email?: string; 
  phone?: string; 
  address?: string; 
}) => {
  return prisma.customer.update({
    where: { id, tenantId },
    data
  });
};

export const deleteCustomer = async (id: string, tenantId: string) => {
  return prisma.customer.delete({
    where: { id, tenantId }
  });
};
