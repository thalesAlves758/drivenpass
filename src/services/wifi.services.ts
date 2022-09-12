import { findFromUserId, insert } from '../repositories/wifi.repository';
import { WiFInsertData, WiFiResponseData } from '../types/wifi.types';
import { decryptText, encryptText } from '../utils/cryptrFunctions';

export async function createWifi(insertData: WiFInsertData): Promise<void> {
  const { password } = insertData;

  const newWifi: WiFInsertData = {
    ...insertData,
    password: encryptText(password),
  };

  await insert(newWifi);
}

function decryptPasswords(wifi: WiFiResponseData[]): WiFiResponseData[] {
  return wifi.map((currentWifi) => ({
    ...currentWifi,
    password: decryptText(currentWifi.password),
  }));
}

export async function findWifiFromUserId(
  userId: number
): Promise<WiFiResponseData[]> {
  return decryptPasswords(
    (await findFromUserId(userId, {
      id: true,
      name: true,
      password: true,
      tag: true,
    })) as WiFiResponseData[]
  );
}
