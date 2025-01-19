import { Extractor } from '../../../core/extractor';
import { Jwk } from '../../../jwks/modules/local/domain/jwk-from-public-key-pem.extractor.port';

export abstract class PublicKeyFromJwksExtractorPort extends Extractor<
  Promise<{ publicKeyPem: string }>,
  {
    jwk: Jwk;
  }
> {}
