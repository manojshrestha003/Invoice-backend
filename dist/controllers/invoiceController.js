"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvoice = exports.updateInvoice = exports.getInvoiceById = exports.getInvoices = exports.createInvoice = void 0;
const invoiceServices_1 = require("../services/invoiceServices");
const createInvoice = async (req, res) => {
    try {
        const tenantId = req.user?.tenantId;
        const userId = req.user?.id;
        if (!tenantId || !userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const invoice = await (0, invoiceServices_1.createInvoiceService)(req.body, tenantId, userId);
        return res.status(201).json({
            success: true,
            data: invoice
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.createInvoice = createInvoice;
const getInvoices = async (req, res) => {
    try {
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const invoices = await (0, invoiceServices_1.getInvoicesService)(tenantId);
        return res.status(200).json({ success: true, data: invoices });
    }
    catch (error) {
        console.error("Error fetching invoices:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getInvoices = getInvoices;
const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const invoice = await (0, invoiceServices_1.getInvoiceByIdService)(id, tenantId);
        if (!invoice) {
            return res.status(404).json({ success: false, message: "Invoice not found" });
        }
        return res.status(200).json({ success: true, data: invoice });
    }
    catch (error) {
        console.error("Error fetching invoice:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getInvoiceById = getInvoiceById;
const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const invoice = await (0, invoiceServices_1.updateInvoiceService)(id, tenantId, req.body);
        return res.status(200).json({ success: true, data: invoice });
    }
    catch (error) {
        console.error("Error updating invoice:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateInvoice = updateInvoice;
const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        await (0, invoiceServices_1.deleteInvoiceService)(id, tenantId);
        return res.status(200).json({ success: true, message: "Invoice deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting invoice:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteInvoice = deleteInvoice;
//# sourceMappingURL=invoiceController.js.map