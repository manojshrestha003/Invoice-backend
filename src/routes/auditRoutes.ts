import { Router } from "express";
import * as auditController from "../controllers/auditController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @openapi
 * /audit-logs:
 *   get:
 *     summary: Get all audit logs for the tenant (Admin only)
 *     tags: [AuditLogs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: number }
 *       - in: query
 *         name: limit
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: List of audit logs
 *       403:
 *         description: Forbidden (Not an admin)
 */
router.get("/", authenticate, auditController.getAuditLogs);

export default router;
