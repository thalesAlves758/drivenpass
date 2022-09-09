import { Credential } from '@prisma/client';
import { prisma } from '../config/database';

export async function findByTagAndUserId(
  userId: number,
  tag: string
): Promise<Credential | null> {
  return prisma.credential.findUnique({
    where: { id_tag: { id: userId, tag } },
  });
}
