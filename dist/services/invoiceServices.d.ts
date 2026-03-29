export declare const createInvoiceService: (data: any, tenantId: string, userId: string) => Promise<{
    customer: {
        id: string;
        name: string;
        address: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        tenantId: string;
    } | null;
    items: {
        id: string;
        description: string;
        quantity: number;
        unitPrice: import("@prisma/client-runtime-utils").Decimal;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        invoiceId: string;
    }[];
    payments: {
        id: string;
        createdAt: Date;
        invoiceId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: string;
        paidAt: Date;
    }[];
} & {
    id: string;
    status: import("../generated/prisma").$Enums.InvoiceStatus;
    createdAt: Date;
    updatedAt: Date;
    tenantId: string;
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date | null;
    subTotal: import("@prisma/client-runtime-utils").Decimal;
    taxRate: import("@prisma/client-runtime-utils").Decimal;
    taxAmount: import("@prisma/client-runtime-utils").Decimal;
    totalAmount: import("@prisma/client-runtime-utils").Decimal;
    notes: string | null;
    userId: string;
    customerId: string | null;
}>;
export declare const getInvoicesService: (tenantId: string) => Promise<({
    customer: {
        id: string;
        name: string;
        address: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        tenantId: string;
    } | null;
    items: {
        id: string;
        description: string;
        quantity: number;
        unitPrice: import("@prisma/client-runtime-utils").Decimal;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        invoiceId: string;
    }[];
    payments: {
        id: string;
        createdAt: Date;
        invoiceId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: string;
        paidAt: Date;
    }[];
} & {
    id: string;
    status: import("../generated/prisma").$Enums.InvoiceStatus;
    createdAt: Date;
    updatedAt: Date;
    tenantId: string;
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date | null;
    subTotal: import("@prisma/client-runtime-utils").Decimal;
    taxRate: import("@prisma/client-runtime-utils").Decimal;
    taxAmount: import("@prisma/client-runtime-utils").Decimal;
    totalAmount: import("@prisma/client-runtime-utils").Decimal;
    notes: string | null;
    userId: string;
    customerId: string | null;
})[]>;
export declare const getInvoiceByIdService: (id: string, tenantId: string) => Promise<({
    customer: {
        id: string;
        name: string;
        address: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        tenantId: string;
    } | null;
    items: {
        id: string;
        description: string;
        quantity: number;
        unitPrice: import("@prisma/client-runtime-utils").Decimal;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        invoiceId: string;
    }[];
    payments: {
        id: string;
        createdAt: Date;
        invoiceId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: string;
        paidAt: Date;
    }[];
} & {
    id: string;
    status: import("../generated/prisma").$Enums.InvoiceStatus;
    createdAt: Date;
    updatedAt: Date;
    tenantId: string;
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date | null;
    subTotal: import("@prisma/client-runtime-utils").Decimal;
    taxRate: import("@prisma/client-runtime-utils").Decimal;
    taxAmount: import("@prisma/client-runtime-utils").Decimal;
    totalAmount: import("@prisma/client-runtime-utils").Decimal;
    notes: string | null;
    userId: string;
    customerId: string | null;
}) | null>;
export declare const deleteInvoiceService: (id: string, tenantId: string) => Promise<{
    id: string;
    status: import("../generated/prisma").$Enums.InvoiceStatus;
    createdAt: Date;
    updatedAt: Date;
    tenantId: string;
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date | null;
    subTotal: import("@prisma/client-runtime-utils").Decimal;
    taxRate: import("@prisma/client-runtime-utils").Decimal;
    taxAmount: import("@prisma/client-runtime-utils").Decimal;
    totalAmount: import("@prisma/client-runtime-utils").Decimal;
    notes: string | null;
    userId: string;
    customerId: string | null;
}>;
export declare const updateInvoiceService: (id: string, tenantId: string, data: any) => Promise<{
    customer: {
        id: string;
        name: string;
        address: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        tenantId: string;
    } | null;
    items: {
        id: string;
        description: string;
        quantity: number;
        unitPrice: import("@prisma/client-runtime-utils").Decimal;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        invoiceId: string;
    }[];
    payments: {
        id: string;
        createdAt: Date;
        invoiceId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: string;
        paidAt: Date;
    }[];
} & {
    id: string;
    status: import("../generated/prisma").$Enums.InvoiceStatus;
    createdAt: Date;
    updatedAt: Date;
    tenantId: string;
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date | null;
    subTotal: import("@prisma/client-runtime-utils").Decimal;
    taxRate: import("@prisma/client-runtime-utils").Decimal;
    taxAmount: import("@prisma/client-runtime-utils").Decimal;
    totalAmount: import("@prisma/client-runtime-utils").Decimal;
    notes: string | null;
    userId: string;
    customerId: string | null;
}>;
//# sourceMappingURL=invoiceServices.d.ts.map