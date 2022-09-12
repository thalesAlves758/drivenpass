import { Request, Response } from 'express';
import { createCard } from '../services/card.services';
import { CardBodyData, CardInsertData } from '../types/card.types';
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
