import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
export declare const recordPayment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPaymentsByInvoice: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deletePayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=paymentController.d.ts.map