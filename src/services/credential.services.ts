import { HttpError } from '../exceptions/HttpException';
import {
  create,
  deleteById,
  findByIdAndUserId,
  findByTagAndUserId,
  findFromUserId,
} from '../repositories/credential.repository';
import {
  CredentialEncryptedFields,
  CredentialInsertData,
  CredentialResponseData,
} from '../types/credential.types';
import { HttpErrorType } from '../types/http.types';
import { decryptFromArrayObject, encryptText } from '../utils/cryptrFunctions';

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

export async function findCredentialsFromUserId(
  userId: number
): Promise<CredentialResponseData[]> {
  const credentials: CredentialResponseData[] = (await findFromUserId(userId, {
    id: true,
    password: true,
    tag: true,
    url: true,
    username: true,
  })) as CredentialResponseData[];

  return decryptFromArrayObject<
    CredentialResponseData,
    CredentialEncryptedFields
  >(credentials, {
    password: true,
  });
}

async function getCredentialIfExists(
  userId: number,
  credentialId: number
): Promise<CredentialResponseData> {
  const credential: CredentialResponseData | null = (await findByIdAndUserId(
    userId,
    credentialId,
    {
      id: true,
      password: true,
      tag: true,
      url: true,
      username: true,
    }
  )) as CredentialResponseData | null;

  if (!credential) {
    throw HttpError(
      HttpErrorType.NOT_FOUND,
      `Could not find specified credential`
    );
  }

  return credential;
}

export async function findCredentialByIdAndUserId(
  userId: number,
  credentialId: number
): Promise<CredentialResponseData> {
  const credential: CredentialResponseData = await getCredentialIfExists(
    userId,
    credentialId
  );

  const [decryptedCredential] = decryptFromArrayObject<
    CredentialResponseData,
    CredentialEncryptedFields
  >([credential], { password: true });

  return decryptedCredential;
}

export async function deleteCredentialById(
  userId: number,
  credentialId: number
): Promise<void> {
  await getCredentialIfExists(userId, credentialId);

  await deleteById(credentialId);
}
