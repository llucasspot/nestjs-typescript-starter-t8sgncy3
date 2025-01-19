import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtSignConfigGetterPort } from '../../../../../services/auth/modules/local/domain/jwt-sign-config.getter.port';
import { ArrayIncludes } from '../../../../core/array.utils';
import { Jwks, JwksServicePort } from '../../../domain/jwks.service.port';
import {
  AsymmetricAlgorithm,
  asymmetricAlgorithms,
  JwkFromPublicKeyPemExtractorPort,
} from '../domain/jwk-from-public-key-pem.extractor.port';
import { PublicKeyPemGetterPort } from './public-key-pem.getter.port';

@Injectable()
export class JwksServiceLocalAdapter implements JwksServicePort {
  private alg: AsymmetricAlgorithm;

  constructor(
    private readonly jwkFromPublicKeyPemExtractor: JwkFromPublicKeyPemExtractorPort,
    private readonly publicKeyPemGetter: PublicKeyPemGetterPort,
    private readonly jwtSignConfigGetter: JwtSignConfigGetterPort,
  ) {}

  async getJwks(): Promise<Jwks> {
    const alg = this.jwtSignConfigGetter.get().alg;
    if (!ArrayIncludes(asymmetricAlgorithms, alg)) {
      throw new InternalServerErrorException('alg no asymmetric algorithm');
    }
    this.alg = alg;
    const publicKeyPem = await this.publicKeyPemGetter.get();
    const jwk = await this.jwkFromPublicKeyPemExtractor.extractFrom({
      publicKeyPem,
      alg: this.alg,
    });
    return {
      keys: [jwk],
    };
  }
}
