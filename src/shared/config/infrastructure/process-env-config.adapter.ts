import { Injectable } from '@nestjs/common';
import {
  AsymmetricAlgorithms,
  asymmetricAlgorithms,
  ConfigPort,
  ExpiresIn,
  JwtSignConfig,
  JwtVerifyConfig,
  StringUrl,
} from '../domain/ports/config.port';

@Injectable()
export class ProcessEnvConfigAdapter implements ConfigPort {
  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'your-secret-key';
  }

  get jwtExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN || '1d';
  }

  get jwtSignOptions(): JwtSignConfig {
    return {
      audience:
        (process.env.JWT_AUDIENCE as StringUrl) || 'http://exemple.com/',
      issuer: (process.env.JWT_ISSUER as StringUrl) || 'http://exemple.com/',
      expiresIn: (process.env.JWT_EXPIRES_IN as ExpiresIn) || '1d',
      refreshTokenExpiresIn:
        (process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as ExpiresIn) || '2d',
    };
  }

  get jwtVerifyOptions(): JwtVerifyConfig {
    return {
      algorithms: process.env.JWT_ALGPRITHMS
        ? (JSON.parse(process.env.JWT_ALGPRITHMS) as AsymmetricAlgorithms)
        : asymmetricAlgorithms,
      audience:
        (process.env.JWT_AUDIENCE as StringUrl) || 'http://exemple.com/',
      issuer: (process.env.JWT_ISSUER as StringUrl) || 'http://exemple.com/',
    };
  }
}
