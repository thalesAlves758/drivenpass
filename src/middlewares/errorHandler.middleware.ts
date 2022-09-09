import { NextFunction, Request, Response } from 'express';
import { HttpErrorType, HttpException, HttpStatus } from '../types/http.types';

function errorHandler(
  error: HttpException | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === HttpErrorType.BAD_REQUEST) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send(error.message ?? HttpErrorType.BAD_REQUEST);
  }

  if (error.type === HttpErrorType.UNAUTHORIZED) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send(error.message ?? HttpErrorType.UNAUTHORIZED);
  }

  if (error.type === HttpErrorType.NOT_FOUND) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .send(error.message ?? HttpErrorType.NOT_FOUND);
  }

  if (error.type === HttpErrorType.CONFLICT) {
    return res
      .status(HttpStatus.CONFLICT)
      .send(error.message ?? HttpErrorType.CONFLICT);
  }

  if (error.type === HttpErrorType.UNPROCESSABLE_ENTITY) {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .send(error.message ?? HttpErrorType.UNPROCESSABLE_ENTITY);
  }

  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send(error.message ?? HttpErrorType.INTERNAL_SERVER_ERROR);
}

export default errorHandler;
