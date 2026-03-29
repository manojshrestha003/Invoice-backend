import { Response } from "express";
import * as notificationService from "../services/notificationService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getNotifications = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const notifications = await notificationService.getNotificationsByUser(userId);
        return res.json({ success: true, data: notifications });
    } catch (error: any) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        await notificationService.markAsRead(id as string, userId);
        return res.json({ success: true, message: "Notification marked as read" });
    } catch (error: any) {
        console.error("Error updating notification:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const markAllAsRead = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        await notificationService.markAllAsRead(userId);
        return res.json({ success: true, message: "All notifications marked as read" });
    } catch (error: any) {
        console.error("Error updating notifications:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteNotification = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        await notificationService.deleteNotification(id as string, userId);
        return res.json({ success: true, message: "Notification deleted" });
    } catch (error: any) {
        console.error("Error deleting notification:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
