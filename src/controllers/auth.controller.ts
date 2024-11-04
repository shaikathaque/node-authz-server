import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import logger from '../config/logger';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.status(201).json(user);
  } catch (error) {
    logger.error(error);
    if (error instanceof Error && error.message === 'User already exists') {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    logger.error(error);
    if (error instanceof Error && error.message === 'Invalid credentials') {
      res.status(401).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: 'Error logging in' });
  }
};