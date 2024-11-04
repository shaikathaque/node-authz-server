import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import logger from '../config/logger';

export async function register(email: string, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  logger.info(`User created: ${user.email}`);
  return user;
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '1h' }
  );

  logger.info(`User logged in: ${user.email}`);
  return { token };
}