import { Request, Response } from 'express';
import { AuthData } from '../types/user.types';
import { HttpStatus } from '../types/http.types';
import * as authServices from '../services/auth.services';

export async function signUp(req: Request, res: Response) {
  const authData: AuthData = req.body;

  await authServices.signUp(authData);

  res.sendStatus(HttpStatus.CREATED);
}

export async function signIn(req: Request, res: Response) {
  const authData: AuthData = req.body;

  const token: string = await authServices.signIn(authData);

  res.send({ token });
}
