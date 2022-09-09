import { HttpError } from '../exceptions/HttpException';
import {
  create,
  findByIdAndUserId,
  findByTagAndUserId,
  findFromUserId,
} from '../repositories/credential.repository';
import {
  CredentialInsertData,
  CredentialResponseData,
} from '../types/credential.types';
import { HttpErrorType } from '../types/http.types';
import { decryptText, encryptText } from '../utils/cryptrFunctions';

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

function decryptPasswords(
  credentials: CredentialResponseData[]
): CredentialResponseData[] {
  return credentials.map((credential) => ({
    ...credential,
    password: decryptText(credential.password),
  }));
}

export async function findCredentialsFromUserId(
  userId: number
): Promise<CredentialResponseData[]> {
  return decryptPasswords(await findFromUserId(userId));
}

export async function findCredentialByIdAndUserId(
  userId: number,
  credentialId: number
): Promise<CredentialResponseData> {
  const credential: CredentialResponseData | null = await findByIdAndUserId(
    userId,
    credentialId
  );

  if (!credential) {
    throw HttpError(
      HttpErrorType.NOT_FOUND,
      `Could not find specified credential`
    );
  }

  const [mappedCredential] = decryptPasswords([credential]);

  return mappedCredential;
}
