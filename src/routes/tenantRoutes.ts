import { Router } from "express";
import { createTenant, getTenants, updateTenant } from "../controllers/tenantController";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware";
const router = Router();

router.post("/create", createTenant);
router.get("/tenants", apiKeyMiddleware, getTenants);
router.patch("/update/:id", apiKeyMiddleware, updateTenant);


export default router;