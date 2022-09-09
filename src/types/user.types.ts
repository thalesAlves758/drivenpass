import { User } from '@prisma/client';

export type AuthData = Omit<User, 'id'>;
