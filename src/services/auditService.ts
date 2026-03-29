import prisma from "../config/database";

export const logAction = async (data: {
  userId: string;
  action: string;
  entity: string;
  entityId?: string;
  changes?: any;
}) => {
  return prisma.auditLog.create({
    data: {
      userId: data.userId,
      action: data.action,
      entity: data.entity,
      entityId: data.entityId,
      changes: data.changes || {},
    }
  });
};

export const getAuditLogs = async (tenantId: string, skip: number = 0, take: number = 20) => {
  const [logs, total] = await prisma.$transaction([
    prisma.auditLog.findMany({
      where: {
        user: {
          tenantId: tenantId
        }
      },
      include: {
          user: {
              select: {
                  name: true,
                  email: true
              }
          }
      },
      skip,
      take,
      orderBy: { createdAt: "desc" }
    }),
    prisma.auditLog.count({
      where: {
        user: {
          tenantId: tenantId
        }
      }
    })
  ]);

  return { logs, total };
};
