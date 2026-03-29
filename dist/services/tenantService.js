"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTenant = exports.getAllTenants = exports.createTenant = void 0;
const database_1 = __importDefault(require("../config/database"));
const createTenant = async (data) => {
    return database_1.default.tenant.create({ data });
};
exports.createTenant = createTenant;
const getAllTenants = async (skip = 0, take = 10) => {
    const [tenants, total] = await database_1.default.$transaction([
        database_1.default.tenant.findMany({
            skip,
            take,
            orderBy: { createdAt: "desc" },
        }),
        database_1.default.tenant.count(),
    ]);
    return { tenants, total };
};
exports.getAllTenants = getAllTenants;
const updateTenant = async (id, data) => {
    return database_1.default.tenant.update({
        where: { id },
        data
    });
};
exports.updateTenant = updateTenant;
//# sourceMappingURL=tenantService.js.map