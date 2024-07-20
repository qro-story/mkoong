import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as Joi from 'joi';
import { getTypeSchema } from 'joi-class-decorators';
import { MyLogger } from '../helpers/logger.helper';
import { CommonError, ERROR_CODE } from '../types';

const debug = new MyLogger('app:core:pipes:params:validation:pipe');

export interface Constructor<T = any> {
  new (...args: unknown[]): T;
}

@Injectable()
export class ParamsValidationPipe implements PipeTransform {
  private readonly schema?: Joi.Schema;

  constructor() {}

  transform(payload: unknown, metadata: ArgumentMetadata): unknown {
    // debug(`transform : `, payload);

    const schema = this.getSchema(metadata);

    if (!schema) {
      return payload;
    }

    const { error, value } = schema.validate(payload, {
      abortEarly: false,
      allowUnknown: schema['_preferences'].allowUnknown ?? false,
    });

    if (error) {
      if (Joi.isError(error)) {
        const reasons = error.details
          .map((detail: { message: string }) =>
            detail.message
              .replace(' is required', '(은)는 필수 항목이예요')
              .replace(/\"/gi, "'"),
          )
          .join(', ');

        const message =
          `'${metadata.type}'에 대한 유효성 검사를 ` +
          (metadata.data ? `항목 "${metadata.data}" 대해서 ` : '') +
          `실패했어요`;
        // throw new Error(message);

        throw new CommonError(ERROR_CODE.INSUFFICIENT_PARAMS, {
          message: message,
          reasons: reasons,
        });
      } else {
        throw error;
      }
    }

    return value;
  }

  private getSchema(metadata: ArgumentMetadata): Joi.Schema | undefined {
    const type: Constructor = metadata.metatype;

    if (
      type === String ||
      type === Object ||
      type === Number ||
      type === Array
    ) {
      return undefined;
    }

    const typeSchema = getTypeSchema(type, {});
    return typeSchema.required();
  }
}
