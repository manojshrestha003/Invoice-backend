"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenantController_1 = require("../controllers/tenantController");
const apiKeyMiddleware_1 = require("../middlewares/apiKeyMiddleware");
const router = (0, express_1.Router)();
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
router.post("/create", tenantController_1.createTenant);
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
router.get("/tenants", apiKeyMiddleware_1.apiKeyMiddleware, tenantController_1.getTenants);
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
router.patch("/update/:id", apiKeyMiddleware_1.apiKeyMiddleware, tenantController_1.updateTenant);
exports.default = router;
//# sourceMappingURL=tenantRoutes.js.map