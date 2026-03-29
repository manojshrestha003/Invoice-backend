import { Response } from "express";
import * as auditService from "../services/auditService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getAuditLogs = async (req: AuthRequest, res: Response) => {
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

        const page = parseInt(req.query["page"] as string) || 1;
        const limit = parseInt(req.query["limit"] as string) || 20;
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
    } catch (error: any) {
        console.error("Error fetching audit logs:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
