import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwksServiceLocalAdapter } from '../../../../jwks/modules/local/application/jwks.service.local-adapter';
import { JwtHeaderExtractorPort } from '../../../domain/ports/jwt-header.extractor.port';
import { PublicKeyFromJwksExtractorPort } from '../../../domain/ports/public-key-from-jwks.extractor.port';
import { PublicKeyGetterPort } from '../../../public-key-getter/public-key.getter.port';

@Injectable()
export class PublicKeyGetterAsyncAdapter implements PublicKeyGetterPort {
  constructor(
    private readonly jwtHeaderExtractor: JwtHeaderExtractorPort,
    private readonly jwksService: JwksServiceLocalAdapter,
    private readonly publicKeyFromJwksExtractor: PublicKeyFromJwksExtractorPort,
  ) {}

  async getByToken({ token }: { token: string }) {
    const { kid, alg } = this.jwtHeaderExtractor.extractFrom({ token });
    if (!kid) {
      throw new UnauthorizedException('no kid found in token');
    }
    if (!alg) {
      throw new UnauthorizedException('no alg found in token');
    }

    const jwk = await this.getJwkByKid({ kid });
    const { publicKeyPem } = await this.publicKeyFromJwksExtractor.extractFrom({
      jwk,
    });
    return publicKeyPem;
  }

  private async getJwkByKid({ kid }: { kid: string }) {
    const jwks = await this.jwksService.getJwks();
    const jwk = jwks.keys.find((jwk) => jwk.kid === kid);
    if (!jwk) {
      throw new UnauthorizedException('no jwk found form giver kid');
    }
    return jwk;
  }
}
