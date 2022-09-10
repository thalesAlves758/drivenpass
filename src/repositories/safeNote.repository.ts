import { SafeNote } from '@prisma/client';
import { prisma } from '../config/database';

export async function findByTitleAndUserId(
  userId: number,
  title: string
): Promise<SafeNote | null> {
  return prisma.safeNote.findUnique({
    where: { title_userId: { title, userId } },
  });
}
