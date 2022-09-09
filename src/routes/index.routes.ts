import { Router } from 'express';
import authRouter from './auth.routes';
import credentialsRouter from './credentials.routes';

const router = Router();

router.use(authRouter);
router.use(credentialsRouter);

export default router;
