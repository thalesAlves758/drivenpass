/* eslint-disable */
export enum HttpErrorType {
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  NOT_FOUND = 'Not Found',
  CONFLICT = 'Conflict',
  UNPROCESSABLE_ENTITY = 'Unprocessable Entity',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
}

export interface HttpException {
  type: HttpErrorType;
  message?: string;
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}
