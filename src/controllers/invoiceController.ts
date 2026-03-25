import { Request, Response } from 'express';
import { createInvoiceService, getInvoicesService, getInvoiceByIdService } from '../services/invoiceServices';

export const createInvoice = async (req: Request, res: Response) => {
    try {
        const { tenantId, userId } = req.body;
        if (!tenantId || !userId) {
            return res.status(400).json({ success: false, message: "tenantId and userId are required" });
        }
        const invoice = await createInvoiceService(req.body, tenantId as string, userId as string);
        return res.status(201).json({ success: true, data: invoice });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getInvoices = async (req: Request, res: Response) => {
    try {
        const { tenantId } = req.query;
        if (!tenantId) {
            return res.status(400).json({ success: false, message: "tenantId is required" });
        }
        const invoices = await getInvoicesService(tenantId as string);
        return res.status(200).json({ success: true, data: invoices });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getInvoiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { tenantId } = req.query;
        if (!tenantId) {
            return res.status(400).json({ success: false, message: "tenantId is required" });
        }
        const invoice = await getInvoiceByIdService(id as string, tenantId as string);
        if (!invoice) {
            return res.status(404).json({ success: false, message: "Invoice not found" });
        }
        return res.status(200).json({ success: true, data: invoice });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
