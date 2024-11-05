import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/errors';
import { AuthenticatedRequest } from '../types/express';
import { Role } from '@prisma/client';

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as {
      userId: string;
      role: Role;
    };

    (req as AuthenticatedRequest).user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AuthError('Invalid token'));
      return;
    }
    next(error);
  }
};
