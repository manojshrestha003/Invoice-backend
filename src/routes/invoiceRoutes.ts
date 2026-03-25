import { Router } from "express";
import { createInvoice, getInvoices, getInvoiceById } from "../controllers/invoiceController";

const router = Router();

/**
 * @openapi
 * /invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tenantId, userId, customerName, items]
 *             properties:
 *               tenantId: { type: string }
 *               userId: { type: string }
 *               customerName: { type: string }
 *               customerEmail: { type: string }
 *               items: 
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description: { type: string }
 *                     quantity: { type: number }
 *                     unitPrice: { type: number }
 *     responses:
 *       201:
 *         description: Invoice created
 */
router.post("/", createInvoice);

/**
 * @openapi
 * /invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     parameters:
 *       - in: query
 *         name: tenantId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get("/", getInvoices);

/**
 * @openapi
 * /invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: tenantId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Invoice details
 */
router.get("/:id", getInvoiceById);

export default router;
