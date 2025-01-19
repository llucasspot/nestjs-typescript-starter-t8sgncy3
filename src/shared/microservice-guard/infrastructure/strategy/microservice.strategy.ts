import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { LoggerI } from '../../../http/logger.interface';
import { PublicKeyGetterPort } from '../../../key-getters-getter/public-key-getter/public-key.getter.port';
import { JwtVerifyConfigGetterPort } from '../../../jwt-guard/domain/jwt-verify-config.getter.port';
import { buildJwtStrategyOptions } from '../../../jwt-guard/infrastructure/strategy/jwt.common.utils';
import { JwtStrategy } from '../../../jwt-guard/infrastructure/strategy/jwt.strategy';

@Injectable()
export class MicroserviceStrategy extends PassportStrategy(
  Strategy,
  'MicroserviceStrategy',
) {
  private readonly logger: LoggerI;

  constructor(
    jwtVerifyConfigGetter: JwtVerifyConfigGetterPort,
    publicKeyGetter: PublicKeyGetterPort,
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
