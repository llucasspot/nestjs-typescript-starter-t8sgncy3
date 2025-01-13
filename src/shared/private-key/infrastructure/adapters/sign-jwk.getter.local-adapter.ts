import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJwkUseCase } from '../../../jwks/modules/local/application/create-jwk.use-case';
import { SignJwkGetterPort } from '../../domain/sign-jwk.getter.port';

@Injectable()
export class SignJwkGetterLocalAdapter implements SignJwkGetterPort {
  constructor(private readonly createJwkUseCase: CreateJwkUseCase) {}

  async get() {
    let signJwkPrivateInfo = this.getSignJwkPrivateInfo();
    if (!signJwkPrivateInfo) {
      await this.createJwkUseCase.execute();
      signJwkPrivateInfo = this.getSignJwkPrivateInfo();
    }
    if (!signJwkPrivateInfo) {
      throw new InternalServerErrorException('no sign key found');
    }
    return signJwkPrivateInfo;
  }

  private getSignJwkPrivateInfo() {
    return this.createJwkUseCase.createdJwkPrivateInfos[0];
  }
}
