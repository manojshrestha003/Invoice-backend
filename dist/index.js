"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tenantRoutes_1 = __importDefault(require("./routes/tenantRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const auditRoutes_1 = __importDefault(require("./routes/auditRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const app = (0, express_1.default)();
const PORT = process.env['PORT'] || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/v1', tenantRoutes_1.default);
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/invoices', invoiceRoutes_1.default);
app.use('/api/v1/customers', customerRoutes_1.default);
app.use('/api/v1/payments', paymentRoutes_1.default);
app.use('/api/v1/notifications', notificationRoutes_1.default);
app.use('/api/v1/audit-logs', auditRoutes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Global Error Handler
app.use((err, _req, res, _next) => {
    console.error('Unhandled Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env['NODE_ENV'] === 'development' ? err : {},
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map