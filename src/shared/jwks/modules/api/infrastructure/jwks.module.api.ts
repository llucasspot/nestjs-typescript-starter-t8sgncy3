import { Module } from '@nestjs/common';
import { JwksServicePort } from '../../../domain/jwks.service.port';
import { JwksServiceApiAdapter } from './adapters/jwks.service.api-adapter';
import { GetJwksUseCaseApiAdapter } from './adapters/get-jwks.use-case.api-adapter';

@Module({
  imports: [],
  providers: [
    {
      provide: JwksServicePort,
      useClass: JwksServiceApiAdapter,
    },
    GetJwksUseCaseApiAdapter,
  ],
  exports: [JwksServicePort],
})
export class JwksModuleApi {}
