import { WiFi } from '@prisma/client';
import { prisma } from '../config/database';
import { WiFInsertData } from '../types/wifi.types';

export async function insert(data: WiFInsertData): Promise<void> {
  await prisma.wiFi.create({ data });
}

type SelectFields = {
  id?: boolean;
  tag?: boolean;
  password?: boolean;
  name?: boolean;
  userId?: boolean;
};

export async function findFromUserId(
  userId: number,
  selectedFields: SelectFields = {
    id: true,
    tag: true,
    password: true,
    name: true,
    userId: true,
  }
): Promise<Partial<WiFi>[]> {
  return prisma.wiFi.findMany({ select: selectedFields, where: { userId } });
}
