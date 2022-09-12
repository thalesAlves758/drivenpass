import { Request, Response } from 'express';
import {
  createCard,
  findCardByIdAndUserId,
  findCardsFromUserId,
} from '../services/card.services';
import {
  CardBodyData,
  CardInsertData,
  CardResponseData,
} from '../types/card.types';
import { HttpStatus } from '../types/http.types';
import { UserData } from '../types/user.types';

export async function create(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;
  const cardData: CardBodyData = req.body;

  const insertData: CardInsertData = {
    ...cardData,
    userId,
  };

  await createCard(insertData);

  res.sendStatus(HttpStatus.CREATED);
}

export async function getAll(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;

  const cards: CardResponseData[] = await findCardsFromUserId(userId);

  res.send(cards);
}

export async function getById(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;
  const cardId: number = Number(req.params.id);

  const card: CardResponseData = await findCardByIdAndUserId(userId, cardId);

  res.send(card);
}
