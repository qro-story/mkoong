import { HttpStatus } from '@nestjs/common';
import { STATUS_CODES } from 'http';

export interface ErrorInterface {
  errorCode: number;
  error: ERROR;
  message?: string;
}

export class CommonError extends Error {
  error: ERROR;
  errorCode?: number;
  message: string;

  constructor({ error, errorCode, message }: ErrorInterface) {
    super((error as string) || '');

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CommonError);
    }

    this.error = error;
    this.errorCode =
      errorCode || ERROR_CODE[error] || HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = message || error;
  }
}

export enum ERROR {
  // DATA
  ALREADY_USED_DATA = 'ALREADY_USED_DATA', // 이미 사용된 데이터
  NO_EXISTS_DATA = 'NO_EXISTS_DATA', // 존재하지 않는 데이터
  NO_EXISTS_USER = 'NO_EXISTS_USER', // 존재하지 않는 사용자

  // Invalid
  INSUFFICIENT_PARAMS = 'INSUFFICIENT_PARAMS', // 필수 매개변수가 부족
  INVALID_PERMISSION = 'INVALID_PERMISSION', // 유효하지 않은 권한
  INVALID_PARAMS = 'INVALID_PARAMS', // 유효하지 않은 매개변수
  INVALID_REQUEST = 'INVALID_REQUEST', // 유효하지 않은 요청

  // Not Allowed
  NOT_ALLOWED_REMOVE_ALL = 'NOT_ALLOWED_REMOVE_ALL', // 모든 결과값을 삭제하는 것은 허용되지 않음

  // EXPIRED
  EXPIRED_PERMISSION = 'EXPIRED_PERMISSION', // 만료된 권한

  // ETC
  UNKNOWN_EXCEPTION = 'UNKNOWN_EXCEPTION', // 알 수 없는 예외가 발생
}

export const ERROR_CODE: { [key in ERROR]: number } = {
  [ERROR.ALREADY_USED_DATA]: 400,
  [ERROR.NO_EXISTS_DATA]: 400,
  [ERROR.NO_EXISTS_USER]: 400,
  [ERROR.INSUFFICIENT_PARAMS]: 400,
  [ERROR.INVALID_PERMISSION]: 400,
  [ERROR.INVALID_PARAMS]: 400,
  [ERROR.INVALID_REQUEST]: 400,
  [ERROR.NOT_ALLOWED_REMOVE_ALL]: 400,
  [ERROR.EXPIRED_PERMISSION]: 400,
  [ERROR.UNKNOWN_EXCEPTION]: 500,
};
