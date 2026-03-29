import { Response } from 'express';
import {
    createInvoiceService, getInvoicesService,
    getInvoiceByIdService, updateInvoiceService,
    deleteInvoiceService
} from '../services/invoiceServices';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createInvoice = async (req: AuthRequest, res: Response) => {
    try {
        const tenantId = req.user?.tenantId;
        const userId = req.user?.id;

        if (!tenantId || !userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const invoice = await createInvoiceService(req.body, tenantId, userId);
        return res.status(201).json({
            success: true,
            data: invoice
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getInvoices = async (req: AuthRequest, res: Response) => {
    try {
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const invoices = await getInvoicesService(tenantId);
        return res.status(200).json({ success: true, data: invoices });
    } catch (error: any) {
        console.error("Error fetching invoices:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getInvoiceById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const invoice = await getInvoiceByIdService(id as string, tenantId);
        if (!invoice) {
            return res.status(404).json({ success: false, message: "Invoice not found" });
        }
        return res.status(200).json({ success: true, data: invoice });
    } catch (error: any) {
        console.error("Error fetching invoice:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateInvoice = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const invoice = await updateInvoiceService(id as string, tenantId, req.body);
        return res.status(200).json({ success: true, data: invoice });
    } catch (error: any) {
        console.error("Error updating invoice:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteInvoice = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        await deleteInvoiceService(id as string, tenantId);
        return res.status(200).json({ success: true, message: "Invoice deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting invoice:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
