import { Request, Response } from 'express';
import {
  createSafeNote,
  findSafeNotesFromUserId,
} from '../services/safeNote.services';
import { HttpStatus } from '../types/http.types';
import {
  SafeNoteBodyData,
  SafeNoteInsertData,
  SafeNoteResponseData,
} from '../types/safeNode.types';
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

export async function getAll(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;

  const safeNotes: SafeNoteResponseData[] = await findSafeNotesFromUserId(
    userId
  );

  res.send(safeNotes);
}
