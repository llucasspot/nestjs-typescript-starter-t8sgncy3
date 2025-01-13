import { Module } from '@nestjs/common';
import { JwtSignConfigGetterPort } from '../domain/jwt-sign-config.getter.port';
import { JwtSignConfigGetterEnvAdapter } from './adapters/jwt-sign-config.getter.env-adapter';

@Module({
  imports: [],
  providers: [
    {
      provide: JwtSignConfigGetterPort,
      useClass: JwtSignConfigGetterEnvAdapter,
    },
  ],
  exports: [JwtSignConfigGetterPort],
})
export class AuthConfModule {}
