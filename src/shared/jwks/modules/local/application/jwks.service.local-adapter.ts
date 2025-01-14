import { Injectable } from '@nestjs/common';
import { Jwks, JwksServicePort } from '../../../domain/jwks.service.port';
import { JwkFromPublicKeyPemExtractorPort } from '../domain/jwk-from-public-key-pem.extractor.port';
import { PublicKeyPemGetter } from './public-key-pem.getter';

@Injectable()
export class JwksServiceLocalAdapter implements JwksServicePort {
  constructor(
    private readonly jwkFromPublicKeyPemExtractor: JwkFromPublicKeyPemExtractorPort,
    private readonly publicKeyPemGetter: PublicKeyPemGetter,
  ) {}

  async getJwks(): Promise<Jwks> {
    const publicKeyPem = await this.publicKeyPemGetter.get();
    const jwk = await this.jwkFromPublicKeyPemExtractor.extractFrom({
      publicKeyPem,
      alg: 'RS256',
    });
    return {
      keys: [jwk],
    };
  }
}
