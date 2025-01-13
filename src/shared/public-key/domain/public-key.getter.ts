import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwksServicePort } from '../../jwks/domain/jwks.service.port';
import { JwtHeaderExtractorPort } from './ports/jwt-header.extractor.port';
import { PublicKeyFromJwksExtractorPort } from './ports/public-key-from-jwks.extractor.port';

@Injectable()
export class PublicKeyGetter {
  constructor(
    private readonly jwtHeaderExtractor: JwtHeaderExtractorPort,
    private readonly jwksService: JwksServicePort,
    private readonly publicKeyFromJwksExtractor: PublicKeyFromJwksExtractorPort,
  ) {}

  async get({ token }: { token: string }) {
    const { kid, alg } = this.jwtHeaderExtractor.extractFrom({ token });
    if (!kid) {
      throw new UnauthorizedException('no kid found in token');
    }
    if (!alg) {
      throw new UnauthorizedException('no alg found in token');
    }

    const jwks = await this.jwksService.getJwks();
    const jwk = jwks.keys.find((jwk) => jwk.kid === kid);
    if (!jwk) {
      throw new UnauthorizedException('no jwk found form giver kid');
    }
    const { publicKeyPem } = await this.publicKeyFromJwksExtractor.extractFrom({
      jwk,
      alg,
    });
    return publicKeyPem;
  }
}
