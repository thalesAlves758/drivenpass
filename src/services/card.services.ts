import { Card } from '@prisma/client';
import { HttpError } from '../exceptions/HttpException';
import { findByTagAndUserId, insert } from '../repositories/card.repository';
import { CardInsertData } from '../types/card.types';
import { HttpErrorType } from '../types/http.types';
import { encryptText } from '../utils/cryptrFunctions';

async function validateCardExists(userId: number, tag: string): Promise<void> {
  const card: Card | null = await findByTagAndUserId(userId, tag);

  if (card) {
    throw HttpError(
      HttpErrorType.CONFLICT,
      `A card with specified tag already exists`
    );
  }
}

export async function createCard(insertData: CardInsertData): Promise<void> {
  const { userId, tag, password, securityCode } = insertData;

  await validateCardExists(userId, tag);

  const newCard: CardInsertData = {
    ...insertData,
    password: encryptText(password),
    securityCode: encryptText(securityCode),
  };

  await insert(newCard);
}