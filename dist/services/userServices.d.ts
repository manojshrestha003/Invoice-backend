export declare const createUser: (name: string, email: string, password: string, role: string, tenantId?: string, avatar?: string) => Promise<{
    id: string;
    name: string;
    phone: string | null;
    createdAt: Date;
    email: string;
    avatar: string | null;
    password: string | null;
    role: string;
    isEmailVerified: boolean;
    tenantId: string | null;
}>;
export declare const updateUser: (id: string, data: any) => Promise<{
    id: string;
    name: string;
    phone: string | null;
    createdAt: Date;
    email: string;
    avatar: string | null;
    password: string | null;
    role: string;
    isEmailVerified: boolean;
    tenantId: string | null;
}>;
export declare const findUserByEmail: (email: string) => Promise<{
    id: string;
    name: string;
    phone: string | null;
    createdAt: Date;
    email: string;
    avatar: string | null;
    password: string | null;
    role: string;
    isEmailVerified: boolean;
    tenantId: string | null;
} | null>;
//# sourceMappingURL=userServices.d.ts.map