import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { pki } from 'node-forge';
import { ArrayIncludes } from '../../../../../core/array.utils';
import {
  AvailableAlgorithm,
  Jwk,
  JwkFromPublicKeyPemExtractorPort,
} from '../../domain/jwk-from-public-key-pem.extractor.port';

@Injectable()
export class JwkFromPublicKeyPemExtractorForgeNodeAdapter
  implements JwkFromPublicKeyPemExtractorPort
{
  private readonly logger = new Logger(this.constructor.name);

  async extractFrom({
    publicKeyPem,
    alg,
  }: {
    publicKeyPem: string;
    alg: AvailableAlgorithm;
  }): Promise<Jwk> {
    if (!ArrayIncludes(['RS256', 'RS384', 'RS512'] as const, alg)) {
      this.logger.error('forge-node only support RSA');
      throw new InternalServerErrorException();
    }
    const jwk = pki.publicKeyFromPem(publicKeyPem);
    const n = Buffer.from(jwk.n.toByteArray()).toString('base64url');
    const e = Buffer.from(jwk.e.toByteArray()).toString('base64url');

    return {
      kty: 'RSA',
      ...jwk,
      n,
      e,
      alg,
      use: 'sig',
      kid: '1',
    };
  }
}
