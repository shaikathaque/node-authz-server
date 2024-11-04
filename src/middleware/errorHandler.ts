import { ErrorRequestHandler } from 'express';
import logger from '../config/logger';
import { config } from '../config/env';

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  logger.error({ err, req: { method: req.method, url: req.url } }, 'Error occurred');

  res.status(500).json({
    status: 'error',
    message: config.nodeEnv === 'production' 
      ? 'Internal server error' 
      : err.message,
  });
}