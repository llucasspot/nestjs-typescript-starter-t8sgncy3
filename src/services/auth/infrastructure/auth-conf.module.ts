import { Module } from '@nestjs/common';
import { JwtSignConfigGetterPort } from '../domain/jwt-sign-config.getter.port';
import { JwtVerifyConfigGetterPort } from '../domain/jwt-verify-config.getter.port';
import { JwtSignConfigGetterEnvAdapter } from './adapters/jwt-sign-config.getter.env-adapter';
import { JwtVerifyConfigGetterEnvAdapter } from './adapters/jwt-verify-config.getter.env-adapter';

@Module({
  providers: [
    {
      provide: JwtSignConfigGetterPort,
      useClass: JwtSignConfigGetterEnvAdapter,
    },
    {
      provide: JwtVerifyConfigGetterPort,
      useClass: JwtVerifyConfigGetterEnvAdapter,
    },
  ],
  exports: [JwtSignConfigGetterPort, JwtVerifyConfigGetterPort],
})
export class AuthConfModule {}
