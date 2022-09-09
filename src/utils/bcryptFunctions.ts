import bcrypt from 'bcrypt';

export function encryptPassword(password: string): string {
  const salt = 10;

  return bcrypt.hashSync(password, salt);
}
