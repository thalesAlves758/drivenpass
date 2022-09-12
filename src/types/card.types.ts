import { Card } from '@prisma/client';

export type CardInsertData = Omit<Card, 'id'>;

export type CardBodyData = Omit<CardInsertData, 'userId'>;
