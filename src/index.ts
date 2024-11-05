import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import pinoHttp from 'pino-http';
import { config } from './config/env';
import logger from './config/logger';
import { errorHandler } from './middleware/errorHandler';
// import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import { AppError } from './utils/errors';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';

const app: Express = express();
const port = process.env.PORT || 3000;

// Request logging middleware
app.use(pinoHttp({ logger }));

// Body parser
app.use(express.json());

// Debug middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.debug('Incoming request:', {
    url: req.url,
    method: req.method,
    body: req.body,
  });
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', environment: config.nodeEnv });
});

// 404 handler - place this after all valid routes
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(404, 'Route not found'));
});

// Error handling middleware (should be last)
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
