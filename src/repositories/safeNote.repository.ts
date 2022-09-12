import { SafeNote } from '@prisma/client';
import { prisma } from '../config/database';
import { SafeNoteInsertData } from '../types/safeNote.types';

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
): Promise<Partial<SafeNote>[]> {
  return prisma.safeNote.findMany({
    select: selectedFields,
    where: { userId },
  });
}

export async function findByIdAndUserId(
  userId: number,
  safeNoteId: number,
  selectedFields: SelectFields = {
    id: true,
    note: true,
    title: true,
    userId: true,
  }
): Promise<Partial<SafeNote> | null> {
  return prisma.safeNote.findFirst({
    select: selectedFields,
    where: { userId, AND: { id: safeNoteId } },
  });
}

export async function deleteById(safeNoteId: number): Promise<void> {
  await prisma.safeNote.delete({ where: { id: safeNoteId } });
}
