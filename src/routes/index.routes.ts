import { Router } from 'express';
import authRouter from './auth.routes';
import credentialsRouter from './credentials.routes';
import safeNotesRouter from './safeNotes.routes';

const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(safeNotesRouter);

export default router;
