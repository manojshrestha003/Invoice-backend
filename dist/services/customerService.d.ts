export declare const createCustomer: (data: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    tenantId: string;
}) => Promise<{
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
    email: string | null;
    tenantId: string;
}>;
export declare const getAllCustomers: (tenantId: string, skip?: number, take?: number) => Promise<{
    customers: {
        id: string;
        name: string;
        address: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        tenantId: string;
    }[];
    total: number;
}>;
export declare const getCustomerById: (id: string, tenantId: string) => Promise<{
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
    email: string | null;
    tenantId: string;
} | null>;
export declare const updateCustomer: (id: string, tenantId: string, data: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
}) => Promise<{
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
    email: string | null;
    tenantId: string;
}>;
export declare const deleteCustomer: (id: string, tenantId: string) => Promise<{
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
    email: string | null;
    tenantId: string;
}>;
//# sourceMappingURL=customerService.d.ts.map