export declare const createTenant: (data: {
    name: string;
    plan?: string;
    logo?: string;
    address?: string;
    phone?: string;
    businessEmail?: string;
    website?: string;
    taxId?: string;
    currency?: string;
    status?: string;
}) => Promise<{
    id: string;
    name: string;
    plan: string;
    logo: string | null;
    address: string | null;
    phone: string | null;
    businessEmail: string | null;
    website: string | null;
    taxId: string | null;
    currency: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getAllTenants: (skip?: number, take?: number) => Promise<{
    tenants: {
        id: string;
        name: string;
        plan: string;
        logo: string | null;
        address: string | null;
        phone: string | null;
        businessEmail: string | null;
        website: string | null;
        taxId: string | null;
        currency: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    total: number;
}>;
export declare const updateTenant: (id: string, data: {
    name?: string;
    plan?: string;
    logo?: string;
    address?: string;
    phone?: string;
    businessEmail?: string;
    website?: string;
    taxId?: string;
    currency?: string;
    status?: string;
}) => Promise<{
    id: string;
    name: string;
    plan: string;
    logo: string | null;
    address: string | null;
    phone: string | null;
    businessEmail: string | null;
    website: string | null;
    taxId: string | null;
    currency: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=tenantService.d.ts.map