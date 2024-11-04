import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';

import { getProfile } from '../controllers/user.controller';

const router = Router();

router.get('/profile', authenticate, getProfile);

export default router;
