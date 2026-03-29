"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvoiceService = exports.deleteInvoiceService = exports.getInvoiceByIdService = exports.getInvoicesService = exports.createInvoiceService = void 0;
const database_1 = __importDefault(require("../config/database"));
const createInvoiceService = async (data, tenantId, userId) => {
    const { items, taxRate = 0, customerId, ...rest } = data;
    if (!customerId) {
        throw new Error("customerId is required");
    }
    // 1. Calculate totals
    let subTotal = 0;
    const processedItems = items.map((item) => {
        const itemSubtotal = Number(item.quantity) * Number(item.unitPrice);
        subTotal += itemSubtotal;
        return {
            description: item.description,
            quantity: Number(item.quantity),
            unitPrice: Number(item.unitPrice),
            totalPrice: itemSubtotal
        };
    });
    const taxAmount = subTotal * (Number(taxRate) / 100);
    const totalAmount = subTotal + taxAmount;
    // 2. Generate Invoice Number (Logic can be improved)
    // We use a tenant-specific count. The schema now enforces uniqueness per tenant.
    const year = new Date().getFullYear();
    const count = await database_1.default.invoice.count({
        where: {
            tenantId,
            createdAt: {
                gte: new Date(`${year}-01-01`),
                lt: new Date(`${year + 1}-01-01`)
            }
        }
    });
    const invoiceNumber = `INV-${year}-${(count + 1).toString().padStart(3, '0')}`;
    // 3. Create in Database
    return await database_1.default.invoice.create({
        data: {
            ...rest,
            invoiceNumber,
            subTotal,
            taxRate: Number(taxRate),
            taxAmount,
            totalAmount,
            tenantId,
            userId,
            customerId,
            items: {
                create: processedItems
            }
        },
        include: {
            items: true,
            customer: true,
            payments: true
        }
    });
};
exports.createInvoiceService = createInvoiceService;
const getInvoicesService = async (tenantId) => {
    return await database_1.default.invoice.findMany({
        where: { tenantId },
        include: {
            items: true,
            customer: true,
            payments: true
        },
        orderBy: { createdAt: 'desc' }
    });
};
exports.getInvoicesService = getInvoicesService;
const getInvoiceByIdService = async (id, tenantId) => {
    return await database_1.default.invoice.findFirst({
        where: { id, tenantId },
        include: {
            items: true,
            customer: true,
            payments: true
        }
    });
};
exports.getInvoiceByIdService = getInvoiceByIdService;
const deleteInvoiceService = async (id, tenantId) => {
    return await database_1.default.invoice.delete({
        where: { id, tenantId }
    });
};
exports.deleteInvoiceService = deleteInvoiceService;
const updateInvoiceService = async (id, tenantId, data) => {
    const { items, taxRate, ...rest } = data;
    // If items are provided, recalculate totals
    if (items || taxRate !== undefined) {
        const existingInvoice = await database_1.default.invoice.findUnique({
            where: { id, tenantId },
            include: { items: true }
        });
        if (!existingInvoice)
            throw new Error("Invoice not found");
        const finalItems = items || existingInvoice.items;
        const finalTaxRate = taxRate !== undefined ? Number(taxRate) : Number(existingInvoice.taxRate);
        let subTotal = 0;
        const processedItems = finalItems.map((item) => {
            const itemSubtotal = Number(item.quantity) * Number(item.unitPrice);
            subTotal += itemSubtotal;
            return {
                description: item.description,
                quantity: Number(item.quantity),
                unitPrice: Number(item.unitPrice),
                totalPrice: itemSubtotal
            };
        });
        const taxAmount = subTotal * (finalTaxRate / 100);
        const totalAmount = subTotal + taxAmount;
        // Update with items (delete existing and recreate)
        return await database_1.default.invoice.update({
            where: { id, tenantId },
            data: {
                ...rest,
                subTotal,
                taxRate: finalTaxRate,
                taxAmount,
                totalAmount,
                items: {
                    deleteMany: {},
                    create: processedItems
                }
            },
            include: {
                items: true,
                customer: true,
                payments: true
            }
        });
    }
    // Update only metadata/rest fields
    return await database_1.default.invoice.update({
        where: { id, tenantId },
        data: rest,
        include: {
            items: true,
            customer: true,
            payments: true
        }
    });
};
exports.updateInvoiceService = updateInvoiceService;
//# sourceMappingURL=invoiceServices.js.map