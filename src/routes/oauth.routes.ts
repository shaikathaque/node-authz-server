import { Router } from 'express';
import { authorize } from '../controllers/oauth.controller';

const router = Router();

router.get('/authorize', authorize);

export default router;
