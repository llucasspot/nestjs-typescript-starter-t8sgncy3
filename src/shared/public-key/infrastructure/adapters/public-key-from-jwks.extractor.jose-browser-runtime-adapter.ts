import { Injectable } from '@nestjs/common';
import { exportSPKI, importJWK, KeyLike } from 'jose-browser-runtime';
import { Jwk } from '../../../jwks/modules/local/domain/jwk.creator.port';
import { PublicKeyFromJwksExtractorPort } from '../../domain/ports/public-key-from-jwks.extractor.port';

@Injectable()
export class PublicKeyFromJwksExtractorJoseBrowserRuntimeAdapter
  implements PublicKeyFromJwksExtractorPort
{
  async extractFrom({
    jwk,
    alg,
  }: {
    jwk: Jwk;
    alg: string;
  }): Promise<{ publicKeyPem: string }> {
    const publicKey = (await importJWK(jwk, alg)) as KeyLike;
    const publicKeyPem = await exportSPKI(publicKey);
    return {
      publicKeyPem,
    };
  }
}
