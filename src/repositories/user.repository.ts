import { User } from '@prisma/client';
import { prisma } from '../config/database';
import { AuthData } from '../types/user.types';

export async function findByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function create({ email, password }: AuthData): Promise<void> {
  await prisma.user.create({ data: { email, password } });
}
