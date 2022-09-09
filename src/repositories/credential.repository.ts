import { Credential } from '@prisma/client';
import { prisma } from '../config/database';
import {
  CredentialInsertData,
  CredentialResponseData,
} from '../types/credential.types';

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

export async function findFromUserId(
  userId: number
): Promise<CredentialResponseData[]> {
  return prisma.credential.findMany({
    select: {
      id: true,
      tag: true,
      url: true,
      username: true,
      password: true,
    },
    where: { userId },
    orderBy: { id: 'desc' },
  });
}
