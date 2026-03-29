export declare const createNotification: (userId: string, message: string) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    message: string;
    isRead: boolean;
}>;
export declare const getNotificationsByUser: (userId: string) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    message: string;
    isRead: boolean;
}[]>;
export declare const markAsRead: (id: string, userId: string) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    message: string;
    isRead: boolean;
}>;
export declare const markAllAsRead: (userId: string) => Promise<import("../generated/prisma").Prisma.BatchPayload>;
export declare const deleteNotification: (id: string, userId: string) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    message: string;
    isRead: boolean;
}>;
//# sourceMappingURL=notificationService.d.ts.map