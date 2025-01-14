import { Injectable } from '@nestjs/common';
import { exportSPKI, importJWK, KeyLike } from 'jose';
import { Jwk } from '../../../jwks/modules/local/domain/jwk-from-public-key-pem.extractor.port';
import { PublicKeyFromJwksExtractorPort } from '../../domain/ports/public-key-from-jwks.extractor.port';

@Injectable()
export class PublicKeyFromJwksExtractorJoseAdapter
  implements PublicKeyFromJwksExtractorPort
{
  async extractFrom({ jwk }: { jwk: Jwk }): Promise<{ publicKeyPem: string }> {
    const publicKey = (await importJWK(jwk, jwk.alg)) as KeyLike;
    const publicKeyPem = await exportSPKI(publicKey);
    return {
      publicKeyPem,
    };
  }
}
