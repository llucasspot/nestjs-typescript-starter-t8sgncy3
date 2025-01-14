import { Module } from '@nestjs/common';
import { JwksServicePort } from '../../../domain/jwks.service.port';
import { JwksServiceApiAdapter } from '../application/jwks.service.api-adapter';

@Module({
  imports: [],
  providers: [
    {
      provide: JwksServicePort,
      useClass: JwksServiceApiAdapter,
    },
  ],
  exports: [JwksServicePort],
})
export class JwksModuleApi {}
