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

type SelectFields = {
  id?: boolean;
  tag?: boolean;
  number?: boolean;
  cardholderName?: boolean;
  securityCode?: boolean;
  password?: boolean;
  virtual?: boolean;
  type?: boolean;
  userId?: boolean;
};

export async function findFromUserId(
  userId: number,
  selectedFields: SelectFields = {
    id: true,
    tag: true,
    number: true,
    cardholderName: true,
    securityCode: true,
    password: true,
    virtual: true,
    type: true,
    userId: true,
  }
): Promise<Partial<Card>[]> {
  return prisma.card.findMany({
    select: selectedFields,
    where: { userId },
  });
}

export async function findByIdAndUserId(
  userId: number,
  cardId: number,
  selectedFields: SelectFields = {
    id: true,
    tag: true,
    number: true,
    cardholderName: true,
    securityCode: true,
    password: true,
    virtual: true,
    type: true,
    userId: true,
  }
): Promise<Partial<Card> | null> {
  return prisma.card.findFirst({
    select: selectedFields,
    where: { userId, AND: { id: cardId } },
  });
}

export async function deleteById(cardId: number): Promise<void> {
  await prisma.card.delete({ where: { id: cardId } });
}
