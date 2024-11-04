import { ErrorRequestHandler } from 'express';
import logger from '../config/logger';
import { AppError } from '../utils/errors';
import { config } from '../config/env';

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  logger.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: config.nodeEnv === 'production' ? 'Internal server error' : err.message,
  });
};
