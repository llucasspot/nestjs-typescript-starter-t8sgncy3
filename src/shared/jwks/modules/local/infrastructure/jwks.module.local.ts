import { Module } from '@nestjs/common';
import { JwksServicePort } from '../../../domain/jwks.service.port';
import { CreateJwksModuleLocal } from './create-jwks.module.local';
import { JwksServiceLocalAdapter } from './adapters/jwks.service.local-adapter';
import { GetJwksUseCaseLocalAdapter } from './adapters/get-jwks.use-case.local-adapter';

@Module({
  imports: [CreateJwksModuleLocal],
  providers: [
    {
      provide: JwksServicePort,
      useClass: JwksServiceLocalAdapter,
    },
    GetJwksUseCaseLocalAdapter,
  ],
  exports: [JwksServicePort],
})
export class JwksModuleLocal {}
