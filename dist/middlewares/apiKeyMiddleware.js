"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyMiddleware = void 0;
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    const validApiKey = process.env['Api_key'];
    if (!apiKey || apiKey !== validApiKey) {
        res.status(401).json({ error: "Unauthorized", message: "API Key required" });
        return;
    }
    next();
};
exports.apiKeyMiddleware = apiKeyMiddleware;
//# sourceMappingURL=apiKeyMiddleware.js.map