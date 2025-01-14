import { Injectable } from '@nestjs/common';
import { exportJWK, importSPKI } from 'jose';
import {
  AvailableAlgorithm,
  ECJwk,
  Jwk,
  JwkFromPublicKeyPemExtractorPort,
  RSAJwk,
} from '../../domain/jwk-from-public-key-pem.extractor.port';

@Injectable()
export class JwkFromPublicKeyPemExtractorJoseAdapter
  implements JwkFromPublicKeyPemExtractorPort
{
  async extractFrom({
    publicKeyPem,
    alg,
  }: {
    publicKeyPem: string;
    alg: AvailableAlgorithm;
  }): Promise<Jwk> {
    const publicKey = await importSPKI(publicKeyPem, alg);
    const jwk = (await exportJWK(publicKey)) as ECJwk | RSAJwk;
    return {
      ...jwk,
      alg,
      use: 'sig',
      kid: '1',
    };
  }
}
