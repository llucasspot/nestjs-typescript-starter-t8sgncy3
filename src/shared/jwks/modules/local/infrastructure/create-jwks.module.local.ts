import { Module } from '@nestjs/common';
import { JwkCreatorPort } from '../domain/jwk.creator.port';
import { JwkCreatorJoseAdapter } from './adapters/jwk.creator.jose-adapter';
import { CreateJwkUseCase } from '../application/create-jwk.use-case';

@Module({
  imports: [],
  providers: [
    CreateJwkUseCase,
    {
      provide: JwkCreatorPort,
      useClass: JwkCreatorJoseAdapter,
    },
  ],
  exports: [CreateJwkUseCase],
})
export class CreateJwksModuleLocal {}
