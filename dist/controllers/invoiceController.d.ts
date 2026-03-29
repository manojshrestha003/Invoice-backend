import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
export declare const createInvoice: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getInvoices: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getInvoiceById: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateInvoice: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteInvoice: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=invoiceController.d.ts.map