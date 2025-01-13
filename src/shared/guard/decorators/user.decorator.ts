import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export { Request } from 'express';

export type UserI = {
  id: string;
};

const userLogger = new Logger('User');

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserI => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // @ts-expect-error request.user
    if (!request.user) {
      userLogger.error('no user in request, use guard');
      throw new InternalServerErrorException();
    }
    // @ts-expect-error request.user
    return request.user;
  },
);
