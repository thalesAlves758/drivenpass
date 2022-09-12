import { WiFi } from '@prisma/client';

export type WiFInsertData = Omit<WiFi, 'id'>;

export type WiFiBodyData = Omit<WiFInsertData, 'userId'>;
