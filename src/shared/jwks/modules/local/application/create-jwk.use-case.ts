import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../core/use-case';
import {
  CreateJwkResponse,
  Jwk,
  JwkCreatorPort,
  JwkPrivateInfo,
} from '../domain/jwk.creator.port';

@Injectable()
export class CreateJwkUseCase implements UseCase<Promise<CreateJwkResponse>> {
  public readonly createdJwkPrivateInfos: JwkPrivateInfo[] = [];
  public readonly createdJwks: Jwk[] = [];

  constructor(private readonly jwkCreator: JwkCreatorPort) {}

  async execute(): Promise<CreateJwkResponse> {
    const options = {
      kid: `${this.createdJwkPrivateInfos.length + 1}`,
      alg: 'RS256',
      use: 'sig',
    } as const;
    const { jwk, jwkPrivateInfo } = await this.jwkCreator.create(options);
    this.createdJwkPrivateInfos.push(jwkPrivateInfo);
    this.createdJwks.push(jwk);
    return { jwk, jwkPrivateInfo };
  }
}
