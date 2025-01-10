import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwksServicePort } from '../../domain/ports/jwks.service.port';
import { KidGetterPort } from '../../domain/ports/kid.getter.port';
import { PublicKeyGetterPort } from '../../domain/ports/public-key.getter.port';

@Injectable()
export class PublicKeyGetterLocalAdapter implements PublicKeyGetterPort {
  constructor(
    private readonly kidGetterPort: KidGetterPort,
    private readonly jwksServicePort: JwksServicePort,
  ) {}

  get({ token }: { token: string }) {
    const kid = this.kidGetterPort.get({ token });
    if (!kid) {
      throw new UnauthorizedException('no kid found in token');
    }
    const keyPrivateInfo = this.jwksServicePort.keyPrivateInfos.find(
      (keyPrivateInfo) => keyPrivateInfo.kid === kid,
    );
    if (!keyPrivateInfo) {
      throw new UnauthorizedException('no key found for kid');
    }
    return keyPrivateInfo.publicKey;
  }
}
