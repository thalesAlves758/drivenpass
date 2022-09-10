import { SafeNote } from '@prisma/client';
import { HttpError } from '../exceptions/HttpException';
import {
  findByTitleAndUserId,
  findFromUserId,
  insert,
} from '../repositories/safeNote.repository';
import { HttpErrorType } from '../types/http.types';
import {
  SafeNoteInsertData,
  SafeNoteResponseData,
} from '../types/safeNode.types';

async function validateSafeNoteExists(
  userId: number,
  title: string
): Promise<void> {
  const safeNote: SafeNote | null = await findByTitleAndUserId(userId, title);

  if (safeNote) {
    throw HttpError(
      HttpErrorType.CONFLICT,
      `A safe note with specified title already exists`
    );
  }
}

export async function createSafeNote({
  note,
  title,
  userId,
}: SafeNoteInsertData) {
  await validateSafeNoteExists(userId, title);

  const newSafeNote: SafeNoteInsertData = {
    note,
    title,
    userId,
  };

  await insert(newSafeNote);
}

export async function findSafeNotesFromUserId(
  userId: number
): Promise<SafeNoteResponseData[]> {
  return (await findFromUserId(userId, {
    id: true,
    note: true,
    title: true,
  })) as SafeNoteResponseData[];
}
