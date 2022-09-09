import { User } from '@prisma/client';

export type IAuthData = Omit<User, 'id'>;
