import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import tenantRoutes from './routes/tenantRoutes';

const app = express();
const PORT = process.env['PORT'] || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', tenantRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`
  -----------------------------------------------
  🟢 Server is running on: http://localhost:${PORT}
  -----------------------------------------------
  `);
});
