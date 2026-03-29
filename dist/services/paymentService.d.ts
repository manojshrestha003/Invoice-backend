export declare const recordPayment: (data: {
    invoiceId: string;
    amount: number;
    method: string;
}) => Promise<{
    id: string;
    createdAt: Date;
    invoiceId: string;
    amount: import("@prisma/client-runtime-utils").Decimal;
    method: string;
    paidAt: Date;
}>;
export declare const getPaymentsByInvoice: (invoiceId: string) => Promise<{
    id: string;
    createdAt: Date;
    invoiceId: string;
    amount: import("@prisma/client-runtime-utils").Decimal;
    method: string;
    paidAt: Date;
}[]>;
export declare const deletePayment: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    invoiceId: string;
    amount: import("@prisma/client-runtime-utils").Decimal;
    method: string;
    paidAt: Date;
}>;
//# sourceMappingURL=paymentService.d.ts.map