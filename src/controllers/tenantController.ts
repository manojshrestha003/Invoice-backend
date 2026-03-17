import { Request, Response } from "express";
import * as tenantService from "../services/tenantService";

export const createTenant = async (req: Request, res: Response) => {
    try {
        const { name, plan } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Missing required field: name" });
        }
        const tenant = await tenantService.createTenant(name, plan);
        return res.status(201).json(tenant);
    } catch (error: any) {
        console.error("Error creating tenant:", error);
        return res.status(500).json({ error: "Error creating tenant", message: error.message });
    }
}

export const getTenants = async (_req: Request, res: Response) => {
    try {
        const tenants = await tenantService.getAllTenants();
        return res.json(tenants);
    }
    catch (error: any) {
        console.error("Error fetching tenants:", error);
        return res.status(500).json({ error: "Error fetching tenants", message: error.message });
    }
}