import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { UserI } from '../../decorators/user.decorator';
import { handleJwtStrategyRequest } from './jwt.common.utils';

@Injectable()
export class JwtGuard extends AuthGuard('JwtStrategy') {
  private readonly logger = new Logger(this.constructor.name);

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser extends UserI>(
    validateMethodError: Error | undefined,
    user: TUser | false | undefined,
    secretOrKeyProviderError: Error | undefined,
    context: ExecutionContextHost,
  ): TUser {
    return handleJwtStrategyRequest(this.logger, {
      validateMethodError,
      user,
      secretOrKeyProviderError,
      context,
    });
  }
}
