import { HttpError } from '../exceptions/HttpException';
import {
  deleteById,
  findByIdAndUserId,
  findFromUserId,
  insert,
} from '../repositories/wifi.repository';
import { HttpErrorType } from '../types/http.types';
import {
  WiFiEncryptedFields,
  WiFInsertData,
  WiFiResponseData,
} from '../types/wifi.types';
import { decryptFromArrayObject, encryptText } from '../utils/cryptrFunctions';

export async function createWifi(insertData: WiFInsertData): Promise<void> {
  const { password } = insertData;

  const newWifi: WiFInsertData = {
    ...insertData,
    password: encryptText(password),
  };

  await insert(newWifi);
}

export async function findWifiFromUserId(
  userId: number
): Promise<WiFiResponseData[]> {
  const wifi: WiFiResponseData[] = (await findFromUserId(userId, {
    id: true,
    name: true,
    password: true,
    tag: true,
  })) as WiFiResponseData[];

  return decryptFromArrayObject<WiFiResponseData, WiFiEncryptedFields>(wifi, {
    password: true,
  });
}

async function getWifiIfExists(
  userId: number,
  wifiId: number
): Promise<WiFiResponseData> {
  const wifi: WiFiResponseData | null = (await findByIdAndUserId(
    userId,
    wifiId,
    {
      id: true,
      name: true,
      password: true,
      tag: true,
    }
  )) as WiFiResponseData | null;

  if (!wifi) {
    throw HttpError(
      HttpErrorType.NOT_FOUND,
      `Could not find specified safe note`
    );
  }

  return wifi;
}

export async function findWifiByIdAndUserId(
  userId: number,
  wifiId: number
): Promise<WiFiResponseData> {
  const wifi: WiFiResponseData = await getWifiIfExists(userId, wifiId);

  const [decryptedWifi] = decryptFromArrayObject<
    WiFiResponseData,
    WiFiEncryptedFields
  >([wifi], { password: true });

  return decryptedWifi;
}

export async function deleteWifiById(
  userId: number,
  wifiId: number
): Promise<void> {
  await getWifiIfExists(userId, wifiId);

  await deleteById(wifiId);
}
