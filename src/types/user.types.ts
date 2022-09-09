import { User } from '@prisma/client';

export type AuthData = Omit<User, 'id'>;

export type JwtUserPayload = { userId: number };

export type UserData = Omit<User, 'password'>;
