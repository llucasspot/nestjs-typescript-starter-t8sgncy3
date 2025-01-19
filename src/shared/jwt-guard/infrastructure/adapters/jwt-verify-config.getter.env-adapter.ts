import { Injectable } from '@nestjs/common';
import { BaseStringUrl } from '../../../../services/auth/modules/local/domain/jwt-sign-config.getter.port';
import {
  asymmetricAlgorithms,
  AvailableAlgorithm,
  symmetricAlgorithms,
} from '../../../jwks/modules/local/domain/jwk-from-public-key-pem.extractor.port';
import { JwtVerifyConfigGetterPort } from '../../domain/jwt-verify-config.getter.port';

@Injectable()
export class JwtVerifyConfigGetterEnvAdapter
  implements JwtVerifyConfigGetterPort
{
  get() {
    return {
      algorithms: process.env.JWT_ALGPRITHMS
        ? (JSON.parse(
            process.env.JWT_ALGPRITHMS,
          ) as readonly AvailableAlgorithm[])
        : ([...asymmetricAlgorithms, ...symmetricAlgorithms] as const),
      audience:
        (process.env.JWT_AUDIENCE as BaseStringUrl) || 'http://exemple.com/',
      issuer:
        (process.env.JWT_ISSUER as BaseStringUrl) || 'http://exemple.com/',
    };
  }
}
