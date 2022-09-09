import Cryptr from 'cryptr';
import dotenv from 'dotenv';

dotenv.config();

const cryptr = new Cryptr(process.env.CRYPTR_SECRET as string);

export function encryptText(text: string): string {
  return cryptr.encrypt(text);
}
