import { prisma } from '../config/database';
import { WiFInsertData } from '../types/wifi.types';

export async function insert(data: WiFInsertData): Promise<void> {
  await prisma.wiFi.create({ data });
}
