import { Response } from 'express';
import { AuthenticatedRequest } from '../types/express';
import prisma from '../config/db';

export const getUsers = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  res.json(users);
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id },
  });

  res.status(204).send();
};
