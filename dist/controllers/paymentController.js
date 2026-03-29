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
exports.deletePayment = exports.getPaymentsByInvoice = exports.recordPayment = void 0;
const paymentService = __importStar(require("../services/paymentService"));
const recordPayment = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error recording payment:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.recordPayment = recordPayment;
const getPaymentsByInvoice = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const payments = await paymentService.getPaymentsByInvoice(invoiceId);
        return res.json({ success: true, data: payments });
    }
    catch (error) {
        console.error("Error fetching payments:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getPaymentsByInvoice = getPaymentsByInvoice;
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        await paymentService.deletePayment(id);
        return res.json({ success: true, message: "Payment deleted and invoice status updated" });
    }
    catch (error) {
        console.error("Error deleting payment:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.deletePayment = deletePayment;
//# sourceMappingURL=paymentController.js.map