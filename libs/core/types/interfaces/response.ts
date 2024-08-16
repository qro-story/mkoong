import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseStatus } from './types';
import { CommonError } from './errors';
import * as _ from 'lodash';

export interface Response {
  status: string;
  statusCode: number;
  errorCode?: number;
  message?: string;
  data: any;
}

function gerResponseMessage(e) {
  if (_.isArray(e?.response?.message)) {
    return e?.response?.message?.join(', ');
  }

  return e?.response?.message ?? e.message;
}

export function customResponse(options: any): Response {
  const status: string = options?.status;
  const statusCode: number = options?.statusCode ?? 500;
  const message: string = options?.message ?? '';
  const data: object = options?.data ?? {};

  return {
    status: status,
    statusCode: statusCode,
    message: message,
    data: data,
  };
}

export function customResponseForSuccess(data: any): Response {
  return customResponse({
    status: ResponseStatus.SUCCESS,
    statusCode: 200,
    data: data,
  });
}

export function customResponseForError(error: Error | any): Response {
  return {
    status: ResponseStatus.ERROR,
    statusCode: error?.response?.status ?? 500,
    message:
      error?.response?.statusText ??
      error?.data?.message ??
      (error?.toString() || 'ERROR'),
    data: error?.data ?? {},
  };
}

export function customResponseForException(
  exception: HttpException | Error | any,
): Response {
  let response: Response;

  if (exception instanceof CommonError) {
    const commonError = exception as CommonError;

    response = customResponse({
      status: ResponseStatus.ERROR,
      statusCode: commonError?.errorCode,
      message: commonError?.errorCode ?? exception?.message ?? 'ERROR',
      data: commonError?.data,
    });
  } else if (exception?.response) {
    response = customResponse({
      status: ResponseStatus.ERROR,
      statusCode:
        exception?.response?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      message: gerResponseMessage(exception),
      data: exception?.data ?? {},
    });
  } else {
    response = customResponse({
      status: ResponseStatus.ERROR,
      statusCode: exception?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception?.errorCode ?? exception?.message ?? 'ERROR',
      data: exception?.data ?? {},
    });
  }

  return response;
}

export function onResponse(req, res, options) {
  const response = customResponse(options);
  res.status(response.statusCode).json(response);
}

export function onException(req, res, exception) {
  onResponse(req, res, customResponseForException(exception));
}

export function onError(req, res, error) {
  onResponse(req, res, customResponseForError(error));
}
