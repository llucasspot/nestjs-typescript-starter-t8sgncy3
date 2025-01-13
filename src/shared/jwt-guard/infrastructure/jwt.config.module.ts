import { Module } from '@nestjs/common';
import { JwtVerifyConfigGetterPort } from '../domain/jwt-verify-config.getter.port';
import { JwtVerifyConfigGetterEnvAdapter } from './adapters/jwt-verify-config.getter.env-adapter';

@Module({
  providers: [
    {
      provide: JwtVerifyConfigGetterPort,
      useClass: JwtVerifyConfigGetterEnvAdapter,
    },
  ],
  exports: [JwtVerifyConfigGetterPort],
})
export class JwtConfigModule {}
