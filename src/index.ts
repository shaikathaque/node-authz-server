import express, { Express } from "express";
import pinoHttp from 'pino-http';
import logger from './config/logger';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();
const port = process.env.PORT || 3000;

// Request logging middleware
app.use(pinoHttp({ logger }));

// Body parser
app.use(express.json());

// Health check route
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Test error route
app.get('/error', () => {
  throw new Error('Test error');
});

// Error handling middleware (should be last)
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
