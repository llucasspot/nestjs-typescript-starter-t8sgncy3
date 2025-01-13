import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJwkUseCase } from '../../../jwks/modules/local/application/create-jwk.use-case';
import { SignJwkGetterPort } from '../../domain/sign-jwk.getter.port';

@Injectable()
export class SignJwkGetterLocalAdapter implements SignJwkGetterPort {
  constructor(private readonly createJwkUseCase: CreateJwkUseCase) {}

  get() {
    const signJwkPrivateInfo = this.createJwkUseCase.createdJwkPrivateInfos[0];
    if (!signJwkPrivateInfo) {
      throw new InternalServerErrorException('no sign key found');
    }
    return signJwkPrivateInfo;
  }
}
