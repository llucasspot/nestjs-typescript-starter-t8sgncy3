import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwksServicePort } from '../../domain/ports/jwks.service.port';
import { SignKeyGetterPort } from '../../domain/ports/sign-key.getter.port';

@Injectable()
export class SignKeyGetterLocalAdapter implements SignKeyGetterPort {
  constructor(private readonly jwksServicePort: JwksServicePort) {}

  get() {
    const signKeyPrivateInfo = this.jwksServicePort.keyPrivateInfos[0];
    if (!signKeyPrivateInfo) {
      throw new InternalServerErrorException('no sign key found');
    }
    return signKeyPrivateInfo;
  }
}
