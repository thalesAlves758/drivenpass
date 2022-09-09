import jwt from 'jsonwebtoken';

export function generateToken(payload: string | object): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
}
