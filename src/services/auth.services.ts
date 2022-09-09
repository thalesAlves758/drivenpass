import { User } from '@prisma/client';
import { HttpError } from '../exceptions/HttpException';
import { create, findByEmail } from '../repositories/user.repository';
import { HttpErrorType } from '../types/http.types';
import { AuthData } from '../types/user.types';
import { encryptPassword } from '../utils/bcryptFunctions';

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
