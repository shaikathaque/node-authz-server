import { Request, Response } from 'express';
import logger from '../config/logger';

export const getUsers = (_req: Request, res: Response): void => {
  logger.info('Fetching users');
  res.json({ users: [] });
};

export const createUser = (req: Request, res: Response): void => {
  logger.info('Creating user', req.body);
  res.status(201).json({ message: 'User created' });
};
