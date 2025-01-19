import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { UserI } from '../../../jwt-guard/decorators/user.decorator';
import { handleJwtStrategyRequest } from '../../../jwt-guard/infrastructure/strategy/jwt.common.utils';

// @Injectable()
// export class MicroserviceGuard implements CanActivate {
//   constructor(
//     private readonly microserviceTokenGetter: MicroserviceTokenGetterPort,
//     private readonly jwtService: JwtService,
//   ) {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers['authorization'];
//
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException(
//         'Missing or invalid authorization header',
//       );
//     }
//
//     const accessToken = await this.microserviceTokenGetter.get();
//
//     const decodedToken = await this.jwtService.verifyAsync<{ role?: string }>(
//       accessToken,
//     );
//     if (decodedToken.role !== 'microservice') {
//       throw new UnauthorizedException('Invalid microservice token');
//     }
//
//     return true;
//   }
// }

@Injectable()
export class MicroserviceGuard extends AuthGuard('MicroserviceStrategy') {
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
