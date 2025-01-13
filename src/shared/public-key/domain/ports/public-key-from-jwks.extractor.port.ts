import { Extractor } from '../../../core/extractor';
import { Jwk } from '../../../jwks/modules/local/domain/jwk.creator.port';

export abstract class PublicKeyFromJwksExtractorPort extends Extractor<
  Promise<{ publicKeyPem: string }>,
  {
    jwk: Jwk;
    alg: string;
  }
> {}
