import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const recordPayment = async (req: AuthRequest, res: Response) => {
    try {
        const { invoiceId, amount, method } = req.body;
        if (!invoiceId || !amount || !method) {
            return res.status(400).json({ success: false, message: "Missing required fields: invoiceId, amount, method" });
        }

        const payment = await paymentService.recordPayment({
            invoiceId,
            amount,
            method
        });

        return res.status(201).json({ success: true, data: payment, message: "Payment recorded successfully" });
    } catch (error: any) {
        console.error("Error recording payment:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getPaymentsByInvoice = async (req: Request, res: Response) => {
    try {
        const { invoiceId } = req.params;
        const payments = await paymentService.getPaymentsByInvoice(invoiceId as string);
        return res.json({ success: true, data: payments });
    } catch (error: any) {
        console.error("Error fetching payments:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deletePayment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await paymentService.deletePayment(id as string);
        return res.json({ success: true, message: "Payment deleted and invoice status updated" });
    } catch (error: any) {
        console.error("Error deleting payment:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
