import { Module } from '@nestjs/common';
import { PrivateKeyPemGetter } from '../../../../../shared/jwks/modules/local/application/private-key-pem.getter';
import { JwksConfigPort } from '../../../../../shared/jwks/modules/local/domain/jwks-config.port';
import { JwksConfigProcessEnvAdapter } from '../../../../../shared/jwks/modules/local/infrastructure/adapters/jwks-config.process-env-adapter';
import { JwtSignConfigGetterPort } from '../domain/jwt-sign-config.getter.port';
import { JwtSignConfigGetterEnvAdapter } from './adapters/jwt-sign-config.getter.env-adapter';

@Module({
  imports: [],
  providers: [
    {
      provide: JwtSignConfigGetterPort,
      useClass: JwtSignConfigGetterEnvAdapter,
    },
    {
      provide: JwksConfigPort,
      useClass: JwksConfigProcessEnvAdapter,
    },
    PrivateKeyPemGetter,
  ],
  exports: [JwtSignConfigGetterPort, JwksConfigPort, PrivateKeyPemGetter],
})
export class AuthConfModule {}
