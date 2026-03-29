import { Router } from "express";
import * as customerController from "../controllers/customerController";
import { authenticate } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { createCustomerSchema, updateCustomerSchema } from "../validations/customerValidation";

const router = Router();

/**
 * @openapi
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               phone: { type: string }
 *               address: { type: string }
 *     responses:
 *       201:
 *         description: Customer created
 */
router.post("/", authenticate, validate(createCustomerSchema), customerController.createCustomer);

/**
 * @openapi
 * /customers:
 *   get:
 *     summary: Get all customers for the tenant
 *     tags: [Customers]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: number }
 *       - in: query
 *         name: limit
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get("/", authenticate, customerController.getCustomers);

/**
 * @openapi
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Customer details
 */
router.get("/:id", authenticate, customerController.getCustomerById);

/**
 * @openapi
 * /customers/{id}:
 *   patch:
 *     summary: Update customer
 *     tags: [Customers]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               phone: { type: string }
 *               address: { type: string }
 *     responses:
 *       200:
 *         description: Customer updated
 */
router.patch("/:id", authenticate, validate(updateCustomerSchema), customerController.updateCustomer);

/**
 * @openapi
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customers]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Customer deleted
 */
router.delete("/:id", authenticate, customerController.deleteCustomer);

export default router;
