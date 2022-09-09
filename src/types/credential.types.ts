import { Credential } from '@prisma/client';

export type CredentialInsertData = Omit<Credential, 'id'>;

export type CredentialBodyData = Omit<CredentialInsertData, 'userId'>;

export type CredentialResponseData = Omit<Credential, 'userId'>;
