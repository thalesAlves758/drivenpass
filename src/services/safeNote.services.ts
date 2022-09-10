import { SafeNote } from '@prisma/client';
import { HttpError } from '../exceptions/HttpException';
import {
  findByTitleAndUserId,
  insert,
} from '../repositories/safeNote.repository';
import { HttpErrorType } from '../types/http.types';
import { SafeNoteInsertData } from '../types/safeNode.types';

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
