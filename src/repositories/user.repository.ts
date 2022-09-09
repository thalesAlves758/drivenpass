import { User } from '@prisma/client';
import { prisma } from '../config/database';

export async function findByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}
