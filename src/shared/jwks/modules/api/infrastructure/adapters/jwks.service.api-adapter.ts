import { Injectable } from '@nestjs/common';
import { Jwks } from '../../../../application/get-jwks.use-case.port';
import { JwksServicePort } from '../../../../domain/jwks.service.port';
import { GetJwksUseCaseApiAdapter } from './get-jwks.use-case.api-adapter';

@Injectable()
export class JwksServiceApiAdapter implements JwksServicePort {
  constructor(private readonly getJwksUseCase: GetJwksUseCaseApiAdapter) {}

  async getJwks(): Promise<Jwks> {
    return this.getJwksUseCase.execute();
  }
}
