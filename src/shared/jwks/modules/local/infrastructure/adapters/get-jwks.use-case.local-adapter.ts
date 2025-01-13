import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../../core/use-case';
import { CreateJwkUseCase } from '../../application/create-jwk.use-case';
import { Jwks } from '../../../../application/get-jwks.use-case.port';

@Injectable()
export class GetJwksUseCaseLocalAdapter implements UseCase<Promise<Jwks>> {
  constructor(private readonly createJwkUseCase: CreateJwkUseCase) {}

  async execute(): Promise<Jwks> {
    if (!this.createJwkUseCase.createdJwks.length) {
      await this.createJwkUseCase.execute();
    }
    return {
      keys: this.createJwkUseCase.createdJwks,
    };
  }
}
