import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { getUsers, deleteUser } from '../controllers/admin.controller';

const router = Router();

router.use(authenticate);
router.use(authorize([Role.ADMIN]));

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

export default router;
