import { Injectable } from '@nestjs/common';
import { AvailableAlgorithm } from '../../../../../../shared/jwks/modules/local/domain/jwk-from-public-key-pem.extractor.port';
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
      alg:
        (process.env.JWT_ALG as AvailableAlgorithm) ||
        ('RS256' as AvailableAlgorithm),
      kid: (process.env.JWT_KID as string) || '1',
    };
  }
}
