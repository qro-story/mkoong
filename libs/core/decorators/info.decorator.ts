import { createParamDecorator } from '@nestjs/common';
import { TokenPayload } from 'src/passport/interfaces/passport.interface';

export const UserInfo = createParamDecorator(
  (data, ctx): Promise<TokenPayload> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
