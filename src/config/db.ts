import { PrismaClient } from '@prisma/client';
import logger from './logger';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

// Logging
prisma.$on('query', (e) => {
  logger.debug(`Query: ${e.query}`);
});

prisma.$on('error', (e) => {
  logger.error(`Database error: ${e.message}`);
});

export default prisma;
