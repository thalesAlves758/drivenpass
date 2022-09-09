import { User } from '@prisma/client';
import { HttpError } from '../exceptions/HttpException';
import { create, findByEmail } from '../repositories/user.repository';
import { HttpErrorType } from '../types/http.types';
import { AuthData } from '../types/user.types';
import { encryptPassword, validatePassword } from '../utils/bcryptFunctions';
import { generateToken } from '../utils/jwtFunctions';

export async function findUserByEmail(email: string): Promise<User | null> {
  return findByEmail(email);
}

export async function signUp({ email, password }: AuthData): Promise<void> {
  const user = await findUserByEmail(email);

  if (user) {
    throw HttpError(HttpErrorType.CONFLICT, `Email already in use`);
  }

  const encryptedPassword = encryptPassword(password);

  await create({ email, password: encryptedPassword });
}

export async function signIn({ email, password }: AuthData): Promise<string> {
  const user = await findUserByEmail(email);

  if (!user || !validatePassword(user.password, password)) {
    throw HttpError(HttpErrorType.UNAUTHORIZED, `Wrong email and/or password`);
  }

  return generateToken({ userId: user.id });
}
