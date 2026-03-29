"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuditLogs = exports.logAction = void 0;
const database_1 = __importDefault(require("../config/database"));
const logAction = async (data) => {
    return database_1.default.auditLog.create({
        data: {
            userId: data.userId,
            action: data.action,
            entity: data.entity,
            entityId: data.entityId,
            changes: data.changes || {},
        }
    });
};
exports.logAction = logAction;
const getAuditLogs = async (tenantId, skip = 0, take = 20) => {
    const [logs, total] = await database_1.default.$transaction([
        database_1.default.auditLog.findMany({
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
        database_1.default.auditLog.count({
            where: {
                user: {
                    tenantId: tenantId
                }
            }
        })
    ]);
    return { logs, total };
};
exports.getAuditLogs = getAuditLogs;
//# sourceMappingURL=auditService.js.map