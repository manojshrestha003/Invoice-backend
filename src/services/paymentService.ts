import prisma from "../config/database";
import { Prisma } from "@prisma/client";

export const recordPayment = async (data: { 
  invoiceId: string; 
  amount: number; 
  method: string; 
}) => {
  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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

    const totalPaid = invoice.payments.reduce((sum: number, p: any) => sum + Number(p.amount), 0);
    const totalAmount = Number(invoice.totalAmount);

    let newStatus = invoice.status;
    if (totalPaid >= totalAmount) {
      newStatus = "PAID";
    } else if (totalPaid > 0) {
      newStatus = "PARTIALLY_PAID";
    } else {
      newStatus = "PENDING";
    }

    // 3. Update the invoice status
    await tx.invoice.update({
      where: { id: data.invoiceId },
      data: { status: newStatus as any }
    });

    return payment;
  });
};

export const getPaymentsByInvoice = async (invoiceId: string) => {
  return prisma.payment.findMany({
    where: { invoiceId },
    orderBy: { createdAt: "desc" }
  });
};

export const deletePayment = async (id: string) => {
  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const payment = await tx.payment.findUnique({ where: { id } });
    if (!payment) throw new Error("Payment not found");

    const invoiceId = payment.invoiceId;

    // Delete the payment
    await tx.payment.delete({ where: { id } });

    // Recalculate invoice status
    const invoice = await tx.invoice.findUnique({
      where: { id: invoiceId },
      include: { payments: true }
    });

    if (invoice) {
        const totalPaid = invoice.payments.reduce((sum: number, p: any) => sum + Number(p.amount), 0);
        const totalAmount = Number(invoice.totalAmount);

        let newStatus = "PENDING";
        if (totalPaid >= totalAmount) {
          newStatus = "PAID";
        } else if (totalPaid > 0) {
          newStatus = "PARTIALLY_PAID";
        }

        await tx.invoice.update({
          where: { id: invoiceId },
          data: { status: newStatus as any }
        });
    }

    return payment;
  });
};
