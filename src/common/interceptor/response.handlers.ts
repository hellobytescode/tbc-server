import { HttpException, HttpStatus } from '@nestjs/common';

export function res500(error, data: any) {
  throw new HttpException(
    {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error.name,
      data: null,
      message: error.message,
      dat: null,
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

export function duplicateRecordRes(message, data: any) {
  return {
    statusCode: HttpStatus.CONFLICT,
    error: 'Duplicate Entry',
    message,
    data: data || null,
  };
}

export function badRequestes(message: string, data?: any) {
  return {
    statusCode: HttpStatus.BAD_REQUEST,
    error: 'Bad request',
    message,
    data: data || null,
  };
}

export function successRes(data?, message?: string) {
  return {
    data,
    statusCode: HttpStatus.CREATED,
    message: message || 'Success',
    error: false,
  };
}

export function unAuthorized(message) {
  return {
    statusCode: HttpStatus.UNAUTHORIZED,
    error: 'Forbidden',
    message: message || 'Resource Forbidden , Access Denied!',
  };
}
