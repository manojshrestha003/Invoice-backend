"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.getPaymentsByInvoice = exports.recordPayment = void 0;
const database_1 = __importDefault(require("../config/database"));
const recordPayment = async (data) => {
    return await database_1.default.$transaction(async (tx) => {
        // 1. Create the payment
        const payment = await tx.payment.create({
            data: {
                invoiceId: data.invoiceId,
                amount: data.amount,
                method: data.method,
            }
        });
        // 2. Fetch the invoice and all its payments to calculate status
        const invoice = await tx.invoice.findUnique({
            where: { id: data.invoiceId },
            include: { payments: true }
        });
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        const totalPaid = invoice.payments.reduce((sum, p) => sum + Number(p.amount), 0);
        const totalAmount = Number(invoice.totalAmount);
        let newStatus = invoice.status;
        if (totalPaid >= totalAmount) {
            newStatus = "PAID";
        }
        else if (totalPaid > 0) {
            newStatus = "PARTIALLY_PAID";
        }
        else {
            newStatus = "PENDING";
        }
        // 3. Update the invoice status
        await tx.invoice.update({
            where: { id: data.invoiceId },
            data: { status: newStatus }
        });
        return payment;
    });
};
exports.recordPayment = recordPayment;
const getPaymentsByInvoice = async (invoiceId) => {
    return database_1.default.payment.findMany({
        where: { invoiceId },
        orderBy: { createdAt: "desc" }
    });
};
exports.getPaymentsByInvoice = getPaymentsByInvoice;
const deletePayment = async (id) => {
    return await database_1.default.$transaction(async (tx) => {
        const payment = await tx.payment.findUnique({ where: { id } });
        if (!payment)
            throw new Error("Payment not found");
        const invoiceId = payment.invoiceId;
        // Delete the payment
        await tx.payment.delete({ where: { id } });
        // Recalculate invoice status
        const invoice = await tx.invoice.findUnique({
            where: { id: invoiceId },
            include: { payments: true }
        });
        if (invoice) {
            const totalPaid = invoice.payments.reduce((sum, p) => sum + Number(p.amount), 0);
            const totalAmount = Number(invoice.totalAmount);
            let newStatus = "PENDING";
            if (totalPaid >= totalAmount) {
                newStatus = "PAID";
            }
            else if (totalPaid > 0) {
                newStatus = "PARTIALLY_PAID";
            }
            await tx.invoice.update({
                where: { id: invoiceId },
                data: { status: newStatus }
            });
        }
        return payment;
    });
};
exports.deletePayment = deletePayment;
//# sourceMappingURL=paymentService.js.map