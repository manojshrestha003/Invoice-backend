import { Request, Response } from 'express';
export declare const requestRegistrationOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyRegistrationOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const completeRegistration: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logoutUser: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findUserByEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=userController.d.ts.map