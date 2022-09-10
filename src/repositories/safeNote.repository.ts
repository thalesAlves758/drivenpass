import { SafeNote } from '@prisma/client';
import { prisma } from '../config/database';
import {
  SafeNoteInsertData,
  SafeNoteResponseData,
} from '../types/safeNode.types';

export async function findByTitleAndUserId(
  userId: number,
  title: string
): Promise<SafeNote | null> {
  return prisma.safeNote.findUnique({
    where: { title_userId: { title, userId } },
  });
}

export async function insert(data: SafeNoteInsertData): Promise<void> {
  await prisma.safeNote.create({ data });
}

type SelectFields = Omit<SafeNote, 'id' | 'title' | 'note' | 'userId'> & {
  id?: boolean;
  title?: boolean;
  note?: boolean;
  userId?: boolean;
};

export async function findFromUserId(
  userId: number,
  selectedFields: SelectFields = {
    id: true,
    note: true,
    title: true,
    userId: true,
  }
): Promise<Partial<SafeNoteResponseData>[]> {
  return prisma.safeNote.findMany({
    select: selectedFields,
    where: { userId },
  });
}
