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
exports.updateTenant = exports.getTenants = exports.createTenant = void 0;
const tenantService = __importStar(require("../services/tenantService"));
const createTenant = async (req, res) => {
    try {
        const { name, plan, logo, address, phone, businessEmail, website, taxId, currency, status } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Missing required field: name" });
        }
        const tenant = await tenantService.createTenant({
            name,
            plan,
            logo,
            address,
            phone,
            businessEmail,
            website,
            taxId,
            currency,
            status
        });
        return res.status(201).json({ message: "Tenant created successfully", tenant });
    }
    catch (error) {
        console.error("Error creating tenant:", error);
        return res.status(500).json({ error: "Error creating tenant", message: error.message });
    }
};
exports.createTenant = createTenant;
const getTenants = async (req, res) => {
    try {
        // Extract page and limit from query parameters with default values
        const page = parseInt(req.query["page"]) || 1;
        const limit = parseInt(req.query["limit"]) || 10;
        // Calculate skip value for database pagination
        const skip = (page - 1) * limit;
        const { tenants, total } = await tenantService.getAllTenants(skip, limit);
        // Calculate total pages
        const totalPages = Math.ceil(total / limit);
        return res.json({
            data: tenants,
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        });
    }
    catch (error) {
        console.error("Error fetching tenants:", error);
        return res.status(500).json({ error: "Error fetching tenants", message: error.message });
    }
};
exports.getTenants = getTenants;
//update 
const updateTenant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, plan, logo, address, phone, businessEmail, website, taxId, currency, status } = req.body;
        if (!id) {
            return res.status(400).json({ error: "Missing tenant ID" });
        }
        if (!name && !plan && !logo && !address && !phone && !businessEmail && !website && !taxId && !currency && !status) {
            return res.status(400).json({ error: "Missing fields to update" });
        }
        // Only include fields that are actually provided in the request body
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (plan !== undefined)
            updateData.plan = plan;
        if (logo !== undefined)
            updateData.logo = logo;
        if (address !== undefined)
            updateData.address = address;
        if (phone !== undefined)
            updateData.phone = phone;
        if (businessEmail !== undefined)
            updateData.businessEmail = businessEmail;
        if (website !== undefined)
            updateData.website = website;
        if (taxId !== undefined)
            updateData.taxId = taxId;
        if (currency !== undefined)
            updateData.currency = currency;
        if (status !== undefined)
            updateData.status = status;
        const tenant = await tenantService.updateTenant(id, updateData);
        return res.json({ message: "Tenant updated successfully", tenant });
    }
    catch (error) {
        console.error("Error updating tenant:", error);
        return res.status(500).json({ error: "Error updating tenant", message: error.message });
    }
};
exports.updateTenant = updateTenant;
//# sourceMappingURL=tenantController.js.map