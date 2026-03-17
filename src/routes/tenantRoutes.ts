import { Router } from "express";
import { createTenant, getTenants } from "../controllers/tenantController";

const router = Router();

router.post("/create", createTenant);
router.get("/tenants", getTenants);

export default router;