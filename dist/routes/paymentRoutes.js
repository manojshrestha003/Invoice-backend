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
const express_1 = require("express");
const paymentController = __importStar(require("../controllers/paymentController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
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
router.post("/", authMiddleware_1.authenticate, paymentController.recordPayment);
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
router.get("/invoice/:invoiceId", authMiddleware_1.authenticate, paymentController.getPaymentsByInvoice);
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
router.delete("/:id", authMiddleware_1.authenticate, paymentController.deletePayment);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map