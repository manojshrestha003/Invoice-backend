import { Request, Response } from "express";
import * as tenantService from "../services/tenantService";

export const createTenant = async (req: Request, res: Response) => {
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
    } catch (error: any) {
        console.error("Error creating tenant:", error);
        return res.status(500).json({ error: "Error creating tenant", message: error.message });
    }
}

export const getTenants = async (req: Request, res: Response) => {
    try {
        // Extract page and limit from query parameters with default values
        const page = parseInt(req.query["page"] as string) || 1;
        const limit = parseInt(req.query["limit"] as string) || 10;

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
    catch (error: any) {
        console.error("Error fetching tenants:", error);
        return res.status(500).json({ error: "Error fetching tenants", message: error.message });
    }
}

//update 
export const updateTenant = async (req: Request, res: Response) => {
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
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (plan !== undefined) updateData.plan = plan;
        if (logo !== undefined) updateData.logo = logo;
        if (address !== undefined) updateData.address = address;
        if (phone !== undefined) updateData.phone = phone;
        if (businessEmail !== undefined) updateData.businessEmail = businessEmail;
        if (website !== undefined) updateData.website = website;
        if (taxId !== undefined) updateData.taxId = taxId;
        if (currency !== undefined) updateData.currency = currency;
        if (status !== undefined) updateData.status = status;

        const tenant = await tenantService.updateTenant(id as string, updateData);
        return res.json({ message: "Tenant updated successfully", tenant });
    }
    catch (error: any) {
        console.error("Error updating tenant:", error);
        return res.status(500).json({ error: "Error updating tenant", message: error.message });
    }
}