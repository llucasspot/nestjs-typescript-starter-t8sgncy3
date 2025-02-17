import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtVerifyConfigGetterPort } from '../../domain/jwt-verify-config.getter.port';
import { LoggerI } from '../../../http/logger.interface';
import { PublicKeyGetterPort } from '../../../key-getters-getter/public-key-getter/public-key.getter.port';
import { buildJwtStrategyOptions } from './jwt.common.utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JwtStrategy') {
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

  async validate(payload: { sub: string; email: string }) {
    return { id: payload.sub, email: payload.email };
  }
}
