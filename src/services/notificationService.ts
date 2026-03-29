import prisma from "../config/database";

export const createNotification = async (userId: string, message: string) => {
  return prisma.notification.create({
    data: { userId, message }
  });
};

export const getNotificationsByUser = async (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
};

export const markAsRead = async (id: string, userId: string) => {
  return prisma.notification.update({
    where: { id, userId },
    data: { isRead: true }
  });
};

export const markAllAsRead = async (userId: string) => {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true }
  });
};

export const deleteNotification = async (id: string, userId: string) => {
  return prisma.notification.delete({
    where: { id, userId }
  });
};
