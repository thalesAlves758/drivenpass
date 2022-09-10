import { Router } from 'express';
import validateToken from '../middlewares/validateToken.middleware';
import * as safeNoteController from '../controllers/safeNote.controller';
import validateSchema from '../middlewares/validateSchema.middleware';
import safeNoteSchema from '../schemas/safeNote.schema';

const safeNotesRouter = Router();

safeNotesRouter.post(
  '/safe-notes',
  validateToken,
  validateSchema(safeNoteSchema),
  safeNoteController.create
);
safeNotesRouter.get('/safe-notes', validateToken, safeNoteController.getAll);
safeNotesRouter.get(
  '/safe-notes/:id',
  validateToken,
  safeNoteController.getById
);
safeNotesRouter.delete(
  '/safe-notes/:id',
  validateToken,
  safeNoteController.deleteById
);

export default safeNotesRouter;
