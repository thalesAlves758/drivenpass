import { SafeNote } from '@prisma/client';

export type SafeNoteInsertData = Omit<SafeNote, 'id'>;

export type SafeNoteBodyData = Omit<SafeNoteInsertData, 'userId'>;

export type SafeNoteResponseData = Omit<SafeNote, 'userId'>;
