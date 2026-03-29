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
exports.getAuditLogs = void 0;
const auditService = __importStar(require("../services/auditService"));
const getAuditLogs = async (req, res) => {
    try {
        const tenantId = req.user?.tenantId;
        const role = req.user?.role;
        if (!tenantId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        // Only ADMIN can see audit logs for the tenant
        if (role !== "ADMIN") {
            return res.status(403).json({ success: false, message: "Forbidden: Admin access required" });
        }
        const page = parseInt(req.query["page"]) || 1;
        const limit = parseInt(req.query["limit"]) || 20;
        const skip = (page - 1) * limit;
        const { logs, total } = await auditService.getAuditLogs(tenantId, skip, limit);
        const totalPages = Math.ceil(total / limit);
        return res.json({
            success: true,
            data: logs,
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        });
    }
    catch (error) {
        console.error("Error fetching audit logs:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAuditLogs = getAuditLogs;
//# sourceMappingURL=auditController.js.map