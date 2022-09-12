import { insert } from '../repositories/wifi.repository';
import { WiFInsertData } from '../types/wifi.types';
import { encryptText } from '../utils/cryptrFunctions';

export async function createWifi(insertData: WiFInsertData): Promise<void> {
  const { password } = insertData;

  const newWifi: WiFInsertData = {
    ...insertData,
    password: encryptText(password),
  };

  await insert(newWifi);
}
