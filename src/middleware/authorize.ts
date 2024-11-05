import { Response, NextFunction } from 'express';

import { AuthError } from '../utils/errors';
import { AuthenticatedRequest } from '../types/express';
import { Role } from '@prisma/client';

export const authorize = (roles: Role[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AuthError('Not authenticated');
    }

    if (!req.user.role || !roles.includes(req.user.role)) {
      throw new AuthError(
        `Not authorized - User role: ${req.user.role}, Required roles: ${roles.join(', ')}`,
      );
    }

    next();
  };
};
