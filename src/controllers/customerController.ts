import { Response } from "express";
import * as customerService from "../services/customerService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createCustomer = async (req: AuthRequest, res: Response) => {
    try {
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json(
                { success: false, message: "Unauthorized: Tenant not found" });
        }

        const customer = await customerService.createCustomer({
            ...req.body,
            tenantId
        });

        return res.status(201).json({
            success: true,
            data: customer, message: "Customer created successfully"
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getCustomers = async (req: AuthRequest, res: Response) => {
    try {
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false, message:
                    "Unauthorized: Tenant not found"
            });
        }

        const page = parseInt(req.query["page"] as string) || 1;
        const limit = parseInt(req.query["limit"] as string) || 10;
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
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getCustomerById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Tenant not found"
            });
        }

        const customer = await customerService.getCustomerById(id as string, tenantId);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        return res.json({ success: true, data: customer });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateCustomer = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Tenant not found"
            });
        }

        const customer = await customerService.updateCustomer(id as string, tenantId, req.body);
        return res.json({
            success: true,
            data: customer,
            message: "Customer updated successfully"
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteCustomer = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const tenantId = req.user?.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Tenant not found"
            });
        }

        await customerService.deleteCustomer(id as string, tenantId);
        return res.json({
            success: true,
            message: "Customer deleted successfully"
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
