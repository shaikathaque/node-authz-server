import 'dotenv/config';
import express, { Express } from "express";
import pinoHttp from 'pino-http';
import { config } from './config/env';
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
  res.status(200).json({ status: "ok", environment: config.nodeEnv });
});

// Error handling middleware (should be last)
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
