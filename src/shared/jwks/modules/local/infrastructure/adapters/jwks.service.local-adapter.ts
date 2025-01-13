import { Injectable } from '@nestjs/common';
import { JwksServicePort } from '../../../../domain/jwks.service.port';
import { Jwks } from '../../../../application/get-jwks.use-case.port';
import { GetJwksUseCaseLocalAdapter } from './get-jwks.use-case.local-adapter';

@Injectable()
export class JwksServiceLocalAdapter implements JwksServicePort {
  constructor(private readonly getJwksUseCase: GetJwksUseCaseLocalAdapter) {}

  async getJwks(): Promise<Jwks> {
    return this.getJwksUseCase.execute();
  }
}
