"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.getCustomerById = exports.getCustomers = exports.createCustomer = void 0;
const customerService = __importStar(require("../services/customerService"));
const createCustomer = async (req, res) => {
    try {
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({ success: false, message: "Unauthorized: Tenant not found" });
        }
        const customer = await customerService.createCustomer({
            ...req.body,
            tenantId
        });
        return res.status(201).json({
            success: true,
            data: customer, message: "Customer created successfully"
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.createCustomer = createCustomer;
const getCustomers = async (req, res) => {
    try {
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false, message: "Unauthorized: Tenant not found"
            });
        }
        const page = parseInt(req.query["page"]) || 1;
        const limit = parseInt(req.query["limit"]) || 10;
        const skip = (page - 1) * limit;
        const { customers, total } = await customerService.getAllCustomers(tenantId, skip, limit);
        const totalPages = Math.ceil(total / limit);
        return res.json({
            success: true,
            data: customers,
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getCustomers = getCustomers;
const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Tenant not found"
            });
        }
        const customer = await customerService.getCustomerById(id, tenantId);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }
        return res.json({ success: true, data: customer });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getCustomerById = getCustomerById;
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Tenant not found"
            });
        }
        const customer = await customerService.updateCustomer(id, tenantId, req.body);
        return res.json({
            success: true,
            data: customer,
            message: "Customer updated successfully"
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Tenant not found"
            });
        }
        await customerService.deleteCustomer(id, tenantId);
        return res.json({
            success: true,
            message: "Customer deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=customerController.js.map