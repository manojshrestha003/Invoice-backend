import { Router } from "express";
import { createTenant, getTenants, updateTenant } from "../controllers/tenantController";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware";
const router = Router();

/**
 * @openapi
 * /create:
 *   post:
 *     summary: Create a new tenant
 *     tags: [Tenants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tenant created successfully
 */
router.post("/create", createTenant);

/**
 * @openapi
 * /tenants:
 *   get:
 *     summary: Get all tenants
 *     tags: [Tenants]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of tenants
 *       401:
 *         description: Unauthorized
 */
router.get("/tenants", apiKeyMiddleware, getTenants);

/**
 * @openapi
 * /update/{id}:
 *   patch:
 *     summary: Update a tenant
 *     tags: [Tenants]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               plan:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tenant updated successfully
 */
router.patch("/update/:id", apiKeyMiddleware, updateTenant);


export default router;