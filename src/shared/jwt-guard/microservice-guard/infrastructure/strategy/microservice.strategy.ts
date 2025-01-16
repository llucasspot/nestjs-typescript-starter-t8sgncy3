import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { LoggerI } from '../../../../http/logger.interface';
import { PublicKeyGetter } from '../../../../public-key/domain/public-key.getter';
import { JwtVerifyConfigGetterPort } from '../../../domain/jwt-verify-config.getter.port';
import { buildJwtStrategyOptions } from '../../../infrastructure/strategy/jwt.common.utils';
import { JwtStrategy } from '../../../infrastructure/strategy/jwt.strategy';

@Injectable()
export class MicroserviceStrategy extends PassportStrategy(
  Strategy,
  'MicroserviceStrategy',
) {
  private readonly logger: LoggerI;

  constructor(
    jwtVerifyConfigGetter: JwtVerifyConfigGetterPort,
    publicKeyGetter: PublicKeyGetter,
  ) {
    const logger = new Logger(JwtStrategy.name);
    super(
      buildJwtStrategyOptions(
        logger,
        publicKeyGetter,
        jwtVerifyConfigGetter.get(),
      ),
    );
    this.logger = logger;
  }

  async validate({ role }: { role?: string }) {
    if (role !== 'microservice') {
      throw new UnauthorizedException('Invalid microservice token');
    }
    return { role };
  }
}
