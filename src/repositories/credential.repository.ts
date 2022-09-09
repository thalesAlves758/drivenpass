import { Credential } from '@prisma/client';
import { prisma } from '../config/database';
import { CredentialInsertData } from '../types/credential.types';

export async function findByTagAndUserId(
  userId: number,
  tag: string
): Promise<Credential | null> {
  return prisma.credential.findUnique({
    where: { id_tag: { id: userId, tag } },
  });
}

export async function create(data: CredentialInsertData): Promise<void> {
  await prisma.credential.create({ data });
}
