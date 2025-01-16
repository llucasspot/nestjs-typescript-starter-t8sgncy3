import { Injectable } from '@nestjs/common';
import {
  ExpiresIn,
  JwtSignConfigGetterPort,
  BaseStringUrl,
} from '../../domain/jwt-sign-config.getter.port';

@Injectable()
export class JwtSignConfigGetterEnvAdapter implements JwtSignConfigGetterPort {
  get() {
    return {
      audience:
        (process.env.JWT_AUDIENCE as BaseStringUrl) || 'http://exemple.com/',
      issuer:
        (process.env.JWT_ISSUER as BaseStringUrl) || 'http://exemple.com/',
      expiresIn: (process.env.JWT_EXPIRES_IN as ExpiresIn) || '1d',
      refreshTokenExpiresIn:
        (process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as ExpiresIn) || '2d',
    };
  }
}
