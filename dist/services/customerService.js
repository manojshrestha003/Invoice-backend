"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.getCustomerById = exports.getAllCustomers = exports.createCustomer = void 0;
const database_1 = __importDefault(require("../config/database"));
const createCustomer = async (data) => {
    return database_1.default.customer.create({ data });
};
exports.createCustomer = createCustomer;
const getAllCustomers = async (tenantId, skip = 0, take = 10) => {
    const [customers, total] = await database_1.default.$transaction([
        database_1.default.customer.findMany({
            where: { tenantId },
            skip,
            take,
            orderBy: { createdAt: "desc" },
        }),
        database_1.default.customer.count({ where: { tenantId } }),
    ]);
    return { customers, total };
};
exports.getAllCustomers = getAllCustomers;
const getCustomerById = async (id, tenantId) => {
    return database_1.default.customer.findUnique({
        where: { id, tenantId },
    });
};
exports.getCustomerById = getCustomerById;
const updateCustomer = async (id, tenantId, data) => {
    return database_1.default.customer.update({
        where: { id, tenantId },
        data
    });
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (id, tenantId) => {
    return database_1.default.customer.delete({
        where: { id, tenantId }
    });
};
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=customerService.js.map