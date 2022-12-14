import { Card } from '@prisma/client';
import { HttpError } from '../exceptions/HttpException';
import {
  deleteById,
  findByIdAndUserId,
  findByTagAndUserId,
  findFromUserId,
  insert,
} from '../repositories/card.repository';
import {
  CardEncryptedFields,
  CardInsertData,
  CardResponseData,
} from '../types/card.types';
import { HttpErrorType } from '../types/http.types';
import { decryptFromArrayObject, encryptText } from '../utils/cryptrFunctions';

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

export async function findCardsFromUserId(
  userId: number
): Promise<CardResponseData[]> {
  const cards: CardResponseData[] = (await findFromUserId(userId, {
    id: true,
    tag: true,
    number: true,
    cardholderName: true,
    securityCode: true,
    password: true,
    virtual: true,
    type: true,
  })) as CardResponseData[];

  return decryptFromArrayObject<CardResponseData, CardEncryptedFields>(cards, {
    password: true,
    securityCode: true,
  });
}

async function getCardIfExists(
  userId: number,
  cardId: number
): Promise<CardResponseData> {
  const card: CardResponseData | null = (await findByIdAndUserId(
    userId,
    cardId,
    {
      id: true,
      tag: true,
      number: true,
      cardholderName: true,
      securityCode: true,
      password: true,
      virtual: true,
      type: true,
    }
  )) as CardResponseData | null;

  if (!card) {
    throw HttpError(HttpErrorType.NOT_FOUND, `Could not find specified card`);
  }

  return card;
}

export async function findCardByIdAndUserId(
  userId: number,
  cardId: number
): Promise<CardResponseData> {
  const card: CardResponseData = await getCardIfExists(userId, cardId);

  const [decryptedCard] = decryptFromArrayObject<
    CardResponseData,
    CardEncryptedFields
  >([card], { password: true, securityCode: true });

  return decryptedCard;
}

export async function deleteCardById(
  userId: number,
  cardId: number
): Promise<void> {
  await getCardIfExists(userId, cardId);

  await deleteById(cardId);
}
