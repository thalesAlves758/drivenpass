import { Request, Response } from 'express';
import { createCredential } from '../services/credential.services';
import {
  CredentialBodyData,
  CredentialInsertData,
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
