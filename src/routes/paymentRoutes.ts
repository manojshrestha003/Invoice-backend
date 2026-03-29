import { Router } from "express";
import * as paymentController from "../controllers/paymentController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @openapi
 * /payments:
 *   post:
 *     summary: Record a new payment for an invoice
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [invoiceId, amount, method]
 *             properties:
 *               invoiceId: { type: string }
 *               amount: { type: number }
 *               method: { type: string }
 *     responses:
 *       201:
 *         description: Payment recorded
 */
router.post("/", authenticate, paymentController.recordPayment);

/**
 * @openapi
 * /payments/invoice/{invoiceId}:
 *   get:
 *     summary: Get all payments for an invoice
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of payments
 */
router.get("/invoice/:invoiceId", authenticate, paymentController.getPaymentsByInvoice);

/**
 * @openapi
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment record
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Payment deleted
 */
router.delete("/:id", authenticate, paymentController.deletePayment);

export default router;
