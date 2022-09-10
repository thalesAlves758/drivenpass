import { SafeNote } from '@prisma/client';
import { prisma } from '../config/database';
import { SafeNoteInsertData } from '../types/safeNode.types';

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
