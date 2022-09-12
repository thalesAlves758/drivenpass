import { Router } from 'express';
import validateToken from '../middlewares/validateToken.middleware';
import * as cardController from '../controllers/card.controller';
import validateSchema from '../middlewares/validateSchema.middleware';
import cardSchema from '../schemas/card.schema';

const cardsRouter = Router();

cardsRouter.post(
  '/cards',
  validateToken,
  validateSchema(cardSchema),
  cardController.create
);
cardsRouter.get('/cards', validateToken, cardController.getAll);

export default cardsRouter;
