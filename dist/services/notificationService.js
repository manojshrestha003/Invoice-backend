"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.markAllAsRead = exports.markAsRead = exports.getNotificationsByUser = exports.createNotification = void 0;
const database_1 = __importDefault(require("../config/database"));
const createNotification = async (userId, message) => {
    return database_1.default.notification.create({
        data: { userId, message }
    });
};
exports.createNotification = createNotification;
const getNotificationsByUser = async (userId) => {
    return database_1.default.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });
};
exports.getNotificationsByUser = getNotificationsByUser;
const markAsRead = async (id, userId) => {
    return database_1.default.notification.update({
        where: { id, userId },
        data: { isRead: true }
    });
};
exports.markAsRead = markAsRead;
const markAllAsRead = async (userId) => {
    return database_1.default.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true }
    });
};
exports.markAllAsRead = markAllAsRead;
const deleteNotification = async (id, userId) => {
    return database_1.default.notification.delete({
        where: { id, userId }
    });
};
exports.deleteNotification = deleteNotification;
//# sourceMappingURL=notificationService.js.map