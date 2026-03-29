"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.markAllAsRead = exports.markAsRead = exports.getNotifications = void 0;
const notificationService = __importStar(require("../services/notificationService"));
const getNotifications = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const notifications = await notificationService.getNotificationsByUser(userId);
        return res.json({ success: true, data: notifications });
    }
    catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getNotifications = getNotifications;
const markAsRead = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        await notificationService.markAsRead(id, userId);
        return res.json({ success: true, message: "Notification marked as read" });
    }
    catch (error) {
        console.error("Error updating notification:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.markAsRead = markAsRead;
const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        await notificationService.markAllAsRead(userId);
        return res.json({ success: true, message: "All notifications marked as read" });
    }
    catch (error) {
        console.error("Error updating notifications:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.markAllAsRead = markAllAsRead;
const deleteNotification = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        await notificationService.deleteNotification(id, userId);
        return res.json({ success: true, message: "Notification deleted" });
    }
    catch (error) {
        console.error("Error deleting notification:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteNotification = deleteNotification;
//# sourceMappingURL=notificationController.js.map