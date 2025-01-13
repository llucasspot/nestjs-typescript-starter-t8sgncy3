import { Injectable } from '@nestjs/common';
import { StringUrl } from '../../domain/jwt-sign-config.getter.port';
import {
  asymmetricAlgorithms,
  AsymmetricAlgorithms,
  JwtVerifyConfigGetterPort,
} from '../../domain/jwt-verify-config.getter.port';

@Injectable()
export class JwtVerifyConfigGetterEnvAdapter
  implements JwtVerifyConfigGetterPort
{
  get() {
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
