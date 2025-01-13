import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { JwtVerifyConfig } from '../../../../services/auth/domain/jwt-verify-config.getter.port';
import { PublicKeyGetter } from '../../../public-key/domain/public-key.getter';
import { LoggerI } from '../../../http/logger.interface';
import { UserI } from '../../decorators/user.decorator';

export const buildJwtStrategyOptions = (
  logger: LoggerI,
  publicKeyGetter: PublicKeyGetter,
  options: JwtVerifyConfig,
) => {
  const { algorithms, issuer, audience } = options;
  return {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKeyProvider: async <TDoneResult>(
      req: Request,
      token: string,
      done: (err: Error | null, publicKey: string | null) => TDoneResult,
    ) => {
      try {
        const publicKey = await publicKeyGetter.get({ token });
        return done(null, publicKey);
      } catch (err) {
        logger.error(err);
        return done(err, null);
      }
    },
    algorithms,
    issuer,
    audience,
  };
};

export const handleJwtStrategyRequest = <TUser extends UserI>(
  logger: LoggerI,
  {
    validateMethodError,
    user,
  }: {
    validateMethodError: Error | undefined;
    user: TUser | false | undefined;
    secretOrKeyProviderError: Error | undefined;
    context: ExecutionContextHost;
  },
): TUser => {
  // if (secretOrKeyProviderError) {
  //   logger.error(
  //     'error in strategy secretOrKeyProvider options : ',
  //     secretOrKeyProviderError,
  //   );
  //   throw secretOrKeyProviderError;
  // }
  if (user === false) {
    logger.error('Invalid token');
    throw new UnauthorizedException();
  }
  if (validateMethodError) {
    logger.error('error in strategy validate method : ', validateMethodError);
    throw validateMethodError;
  }
  if (!user) {
    logger.error('user not set by the strategy');
    throw new UnauthorizedException();
  }
  return user;
};
