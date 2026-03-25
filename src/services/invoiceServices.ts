import prisma from '../config/database';

export const createInvoiceService = async (data: any, tenantId: string, userId: string) => {
    const { items, taxRate = 0, ...rest } = data;

    // 1. Calculate totals
    let subTotal = 0;
    const processedItems = items.map((item: any) => {
        const totalPrice = item.quantity * item.unitPrice;
        subTotal += totalPrice;
        return { ...item, totalPrice };
    });

    const taxAmount = subTotal * (taxRate / 100);
    const totalAmount = subTotal + taxAmount;

    // 2. Generate Invoice Number (Logic can be improved)
    const count = await prisma.invoice.count({ where: { tenantId } });
    const invoiceNumber = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(3, '0')}`;

    // 3. Create in Database
    return await prisma.invoice.create({
        data: {
            ...rest,
            invoiceNumber,
            subTotal,
            taxRate,
            taxAmount,
            totalAmount,
            tenantId,
            userId,
            items: {
                create: processedItems
            }
        },
        include: { items: true }
    });
};

export const getInvoicesService = async (tenantId: string) => {
    return await prisma.invoice.findMany({
        where: { tenantId },
        include: { items: true },
        orderBy: { createdAt: 'desc' }
    });
};

export const getInvoiceByIdService = async (id: string, tenantId: string) => {
    return await prisma.invoice.findFirst({
        where: { id, tenantId },
        include: { items: true }
    });
};
