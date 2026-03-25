import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import tenantRoutes from './routes/tenantRoutes';
import authRoutes from './routes/authRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();
const PORT = process.env['PORT'] || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', tenantRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/invoices', invoiceRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env['NODE_ENV'] === 'development' ? err : {},
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
