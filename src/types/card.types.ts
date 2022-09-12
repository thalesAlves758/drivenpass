import { Card } from '@prisma/client';

export type CardInsertData = Omit<Card, 'id'>;

export type CardBodyData = Omit<CardInsertData, 'userId'>;

export type CardResponseData = Omit<Card, 'userId'>;

export type CardEncryptedFields = { password: boolean; securityCode: true };
