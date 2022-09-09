import { HttpError } from '../exceptions/HttpException';
import {
  create,
  findByTagAndUserId,
} from '../repositories/credential.repository';
import { CredentialInsertData } from '../types/credential.types';
import { HttpErrorType } from '../types/http.types';
import { encryptText } from '../utils/cryptrFunctions';

async function validateTagExists(userId: number, tag: string): Promise<void> {
  const credential = await findByTagAndUserId(userId, tag);

  if (credential) {
    throw HttpError(
      HttpErrorType.CONFLICT,
      `Already exists a credential with specified tag`
    );
  }
}

export async function createCredential({
  tag,
  password,
  url,
  userId,
  username,
}: CredentialInsertData): Promise<void> {
  await validateTagExists(userId, tag);

  const newCredential: CredentialInsertData = {
    tag,
    url,
    username,
    password: encryptText(password),
    userId,
  };

  await create(newCredential);
}
