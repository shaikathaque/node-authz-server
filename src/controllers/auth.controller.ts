import { NextFunction, Request, Response } from 'express';
import { register, login } from '../services/auth.service';
import logger from '../config/logger';

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await register(email, password);
    res.status(201).json(user);
  } catch (error) {
    logger.debug(14);
    console.log('Original error:', error);
    next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
