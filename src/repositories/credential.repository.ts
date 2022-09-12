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
    where: { tag_userId: { userId, tag } },
  });
}

export async function create(data: CredentialInsertData): Promise<void> {
  await prisma.credential.create({ data });
}

type SelectFields = {
  id?: boolean;
  tag?: boolean;
  url?: boolean;
  username?: boolean;
  password?: boolean;
  userId?: boolean;
};

const selectedFieldsDefault = {
  id: true,
  tag: true,
  url: true,
  username: true,
  password: true,
  userId: true,
};

export async function findFromUserId(
  userId: number,
  select: SelectFields = selectedFieldsDefault
): Promise<Partial<CredentialResponseData>[]> {
  return prisma.credential.findMany({
    select,
    where: { userId },
    orderBy: { id: 'desc' },
  });
}

export async function findByIdAndUserId(
  userId: number,
  credentialId: number,
  select: SelectFields = selectedFieldsDefault
): Promise<Partial<CredentialResponseData> | null> {
  return prisma.credential.findFirst({
    select,
    where: { userId, AND: { id: credentialId } },
  });
}

export async function deleteById(credentialId: number): Promise<void> {
  await prisma.credential.delete({ where: { id: credentialId } });
}
