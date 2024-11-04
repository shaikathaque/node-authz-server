import { Router } from 'express';
import { registerHandler, loginHandler } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import logger from '../config/logger';

const router = Router();

// Add a debug middleware
router.use((req, _res, next) => {
  logger.debug('Request body:', req.body);
  next();
});

router.post('/register', validateRequest(registerSchema), registerHandler);
router.post('/login', validateRequest(loginSchema), loginHandler);

export default router;
