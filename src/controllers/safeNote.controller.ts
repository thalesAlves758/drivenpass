import { Request, Response } from 'express';
import { createSafeNote } from '../services/safeNote.services';
import { HttpStatus } from '../types/http.types';
import { SafeNoteBodyData, SafeNoteInsertData } from '../types/safeNode.types';
import { UserData } from '../types/user.types';

export async function create(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;
  const safeNoteData: SafeNoteBodyData = req.body;

  const insertData: SafeNoteInsertData = {
    ...safeNoteData,
    userId,
  };

  await createSafeNote(insertData);

  res.sendStatus(HttpStatus.CREATED);
}
