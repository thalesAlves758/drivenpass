import { Request, Response } from 'express';
import {
  createCredential,
  findCredentialByIdAndUserId,
  findCredentialsFromUserId,
} from '../services/credential.services';
import {
  CredentialBodyData,
  CredentialInsertData,
  CredentialResponseData,
} from '../types/credential.types';
import { HttpStatus } from '../types/http.types';
import { UserData } from '../types/user.types';

export async function create(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;
  const credentialData: CredentialBodyData = req.body;

  const insertData: CredentialInsertData = {
    ...credentialData,
    userId,
  };

  await createCredential(insertData);

  res.sendStatus(HttpStatus.CREATED);
}

export async function getAll(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;

  const credentials: CredentialResponseData[] = await findCredentialsFromUserId(
    userId
  );

  res.send(credentials);
}

export async function getById(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;
  const credentialId: number = Number(req.params.id);

  const credential: CredentialResponseData = await findCredentialByIdAndUserId(
    userId,
    credentialId
  );

  res.send(credential);
}
