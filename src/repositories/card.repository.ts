import { Card } from '@prisma/client';
import { prisma } from '../config/database';
import { CardInsertData } from '../types/card.types';

export async function findByTagAndUserId(
  userId: number,
  tag: string
): Promise<Card | null> {
  return prisma.card.findUnique({ where: { tag_userId: { tag, userId } } });
}

export async function insert(data: CardInsertData): Promise<void> {
  await prisma.card.create({ data });
}
