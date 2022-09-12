import { Router } from 'express';
import authRouter from './auth.routes';
import cardsRouter from './cards.routes';
import credentialsRouter from './credentials.routes';
import safeNotesRouter from './safeNotes.routes';
import wifiRouter from './wifi.routes';

const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(safeNotesRouter);
router.use(cardsRouter);
router.use(wifiRouter);

export default router;
