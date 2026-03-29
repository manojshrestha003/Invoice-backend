export declare const logAction: (data: {
    userId: string;
    action: string;
    entity: string;
    entityId?: string;
    changes?: any;
}) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    action: string;
    entity: string;
    entityId: string | null;
    changes: import("../generated/prisma/runtime/client").JsonValue | null;
}>;
export declare const getAuditLogs: (tenantId: string, skip?: number, take?: number) => Promise<{
    logs: ({
        user: {
            name: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        action: string;
        entity: string;
        entityId: string | null;
        changes: import("../generated/prisma/runtime/client").JsonValue | null;
    })[];
    total: number;
}>;
//# sourceMappingURL=auditService.d.ts.map