import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { HttpError } from '../exceptions/HttpException';
import { findUserById } from '../services/user.services';
import { HttpErrorType } from '../types/http.types';
import { JwtUserPayload, UserData } from '../types/user.types';
import { validateToken as validate } from '../utils/jwtFunctions';

function checkToken(token: string | undefined) {
  if (!token) {
    throw HttpError(HttpErrorType.UNAUTHORIZED, `Token required`);
  }

  const decodedPayload: string | JwtPayload | null = validate(token);

  if (!decodedPayload) {
    throw HttpError(HttpErrorType.UNAUTHORIZED, `Invalid token`);
  }

  return decodedPayload;
}

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token: string | undefined = authorization?.replace('Bearer ', '');

  const { userId } = checkToken(token) as JwtUserPayload;

  const user: UserData = await findUserById(userId);

  res.locals = user;

  next();
}

export default validateToken;
