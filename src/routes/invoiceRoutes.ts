import { Router } from "express";
import { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } from "../controllers/invoiceController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @openapi
 * /invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [customerId, items]
 *             properties:
 *               customerId: { type: string }
 *               taxRate: { type: number, default: 0 }
 *               items: 
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description: { type: string }
 *                     quantity: { type: number }
 *                     unitPrice: { type: number }
 *               notes: { type: string }
 *               dueDate: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: Invoice created
 */
router.post("/", authenticate, createInvoice);

/**
 * @openapi
 * /invoices:
 *   get:
 *     summary: Get all invoices for the current tenant
 *     tags: [Invoices]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get("/", authenticate, getInvoices);

/**
 * @openapi
 * /invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Invoice details
 */
router.get("/:id", authenticate, getInvoiceById);

/**
 * @openapi
 * /invoices/{id}:
 *   patch:
 *     summary: Update an invoice
 *     tags: [Invoices]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId: { type: string }
 *               taxRate: { type: number }
 *               items: { type: array }
 *               notes: { type: string }
 *               dueDate: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Invoice updated
 */
router.patch("/:id", authenticate, updateInvoice);

/**
 * @openapi
 * /invoices/{id}:
 *   delete:
 *     summary: Delete an invoice
 *     tags: [Invoices]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Invoice deleted
 */
router.delete("/:id", authenticate, deleteInvoice);

export default router;
