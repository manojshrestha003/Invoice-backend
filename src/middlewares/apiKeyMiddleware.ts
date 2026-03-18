import { Request, Response, NextFunction } from "express";

export const apiKeyMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const apiKey = req.headers["x-api-key"];
    const validApiKey = process.env['Api_key'];

    if (!apiKey || apiKey !== validApiKey) {
        res.status(401).json({ error: "Unauthorized", message: "API Key required" });
        return;
    }

    next();
};