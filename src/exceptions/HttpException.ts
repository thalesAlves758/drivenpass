import { HttpErrorType, HttpException } from '../types/http.types';

export function HttpError(
  type: HttpErrorType,
  message?: string
): HttpException {
  return {
    type,
    message,
  };
}
