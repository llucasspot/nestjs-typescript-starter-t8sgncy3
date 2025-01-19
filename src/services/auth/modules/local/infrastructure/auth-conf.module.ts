import { Module } from '@nestjs/common';
import { PrivateKeyPemGetterPort } from '../../../../../shared/jwks/modules/local/application/private-key-pem.getter.port';
import { JwksConfigPort } from '../../../../../shared/jwks/modules/local/domain/jwks-config.port';
import { JwksConfigProcessEnvAdapter } from '../../../../../shared/jwks/modules/local/infrastructure/adapters/jwks-config.process-env-adapter';
import { PrivateKeyPemGetterFsAdapter } from '../../../../../shared/jwks/modules/local/infrastructure/adapters/private-key-pem.getter.fs-adapter';
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
    {
      provide: PrivateKeyPemGetterPort,
      useClass: PrivateKeyPemGetterFsAdapter,
    },
  ],
  exports: [JwtSignConfigGetterPort, JwksConfigPort, PrivateKeyPemGetterPort],
})
export class AuthConfModule {}
