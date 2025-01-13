import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import jwkToPem from 'jwk-to-pem';
import { Jwk } from '../../../jwks/modules/local/domain/jwk.creator.port';
import { PublicKeyFromJwksExtractorPort } from '../../domain/ports/public-key-from-jwks.extractor.port';

@Injectable()
export class PublicKeyFromJwksExtractorJwkToPemAdapter
  implements PublicKeyFromJwksExtractorPort
{
  private readonly logger = new Logger(this.constructor.name);

  async extractFrom({ jwk }: { jwk: Jwk }): Promise<{ publicKeyPem: string }> {
    if (!this.isRSAJwk(jwk)) {
      this.logger.error(jwk.kty !== 'RSA');
      throw new InternalServerErrorException();
    }
    const publicKeyPem = jwkToPem(jwk);
    return {
      publicKeyPem,
    };
  }

  private isRSAJwk(jwk: Jwk): jwk is Jwk & { kty: 'RSA' } {
    return jwk.kty === 'RSA';
  }
}
