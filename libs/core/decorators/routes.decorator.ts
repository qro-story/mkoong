import {
  applyDecorators,
  CanActivate,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Redirect,
  SetMetadata,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { DeserializeInterceptor } from '../interceptors/deserialize.interceptor';
import { TimeoutInterceptor } from '../interceptors';
import { TransactionInterceptor } from '../interceptors/transaction.interceptor';
import { DataSource } from 'typeorm';

const getEnumKeyByValue = (_enum: any, _value: any) => {
  const indexOfS = Object.values(_enum).indexOf(_value as unknown);

  const key = Object.keys(_enum)[indexOfS];

  return key || _value;
};

export enum HttpMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  ALL = 'ALL',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export const Tags = ApiTags;

export interface RouteOptions {
  path?: string; // 경로
  method: HttpMethodEnum | string; // HTTP 메소드
  summary?: string; // 요약
  description?: string; // 설명
  tags?: string[]; // 태그 배열
  roles?: string[]; // 역할 배열
  version?: string; // 버전
  redirect?: boolean; // 리다이렉트 여부
  exclude?: boolean; // 엔드포인트 제외 여부
  auth?: boolean; // 인증 필요 여부
  timeout?: number; // 타임아웃 처리 (설정을 안하면 120000 = 120초)
  transform?: any;
  transactional?: boolean; // transaction 처리 여부
}

export function Route(options: RouteOptions) {
  const method = getEnumKeyByValue(
    HttpMethodEnum,
    options.method,
  ).toUpperCase();
  const decorators = [];

  if (!options.path) {
    throw new Error('UNKNOWN PATH');
  }

  // Method (required)
  if (method === HttpMethodEnum.GET) {
    decorators.push(Get(options.path));
  } else if (method === HttpMethodEnum.POST) {
    decorators.push(Post(options.path));
  } else if (method === HttpMethodEnum.PUT) {
    decorators.push(Put(options.path));
  } else if (method === HttpMethodEnum.PATCH) {
    decorators.push(Patch(options.path));
  } else if (method === HttpMethodEnum.DELETE) {
    decorators.push(Delete(options.path));
  } else {
    throw new Error('UNKNOWN METHOD');
  }

  decorators.push(Allow);

  // Summary
  if (options.summary || options.description) {
    decorators.push(
      ApiOperation({
        summary: options.summary,
        description: options.description,
      }),
    );
  }

  // Tags
  if (options.tags) {
    options.tags.forEach((tag) => {
      decorators.push(ApiTags(tag));
    });
  }

  // Auth
  if (options.auth === true) {
    decorators.push(ApiBearerAuth());
  }

  // Roles
  if (options.roles) {
    decorators.push(
      ApiResponse({
        status: 401,
        description: 'Unauthorized',
      }),
    );
    decorators.push(
      ApiResponse({
        status: 403,
        description: 'AccessNotAllow',
      }),
    );

    decorators.push(SetMetadata('roles', options.roles));

    decorators.push(ApiBearerAuth());
  }

  decorators.push(ApiConsumes('application/x-www-form-urlencoded'));
  decorators.push(ApiConsumes('application/json'));

  // Version
  if (options.version) {
    decorators.push(Version(options.version));
  } else if (options.version !== '') {
    // default 1
    decorators.push(Version('1'));
  }

  // Redirect
  if (options.redirect) {
    decorators.push(Redirect());
    decorators.push(ApiResponse({ status: 302, description: 'Redirect' }));
  } else {
    if (['POST', 'PUT'].includes(method)) {
      decorators.push(ApiResponse({ status: 201, description: 'Success' }));
    } else {
      decorators.push(ApiResponse({ status: 200, description: 'Success' }));
    }
    decorators.push(ApiResponse({ status: 500, description: 'Error' }));
  }

  // Exclude
  if (options.exclude) {
    decorators.push(ApiExcludeEndpoint());
  }

  // Timeout
  if (options.timeout > 0) {
    decorators.push(UseInterceptors(new TimeoutInterceptor(options.timeout)));
  }

  // Deserialize
  if (options.transform) {
    decorators.push(
      UseInterceptors(new DeserializeInterceptor(options.transform)),
    );
  }

  // transactional
  if (options.transactional) {
    console.log('tranasactional interceptor 사용');
    decorators.push(UseInterceptors(TransactionInterceptor));
  }

  // decorators.push(UseFilters(HttpExceptionFilter));

  return applyDecorators(...decorators);
}
