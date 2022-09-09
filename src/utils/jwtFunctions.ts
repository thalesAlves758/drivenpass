import jwt, { JwtPayload } from 'jsonwebtoken';

export function generateToken(payload: string | object): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
}

export function validateToken(token: string): JwtPayload | string | null {
  try {
    const decoded: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    return decoded;
  } catch (error) {
    return null;
  }
}
