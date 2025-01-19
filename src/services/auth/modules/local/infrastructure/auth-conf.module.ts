import { Module } from '@nestjs/common';
import { LocalFilePathResolverPort } from '../../../../../shared/file/local-file-path.resolver.port';
import { inWebContainer } from '../../../../../shared/hashing/infrastructure/in-web-container';
import { PrivateKeyPemGetterPort } from '../../../../../shared/jwks/modules/local/application/private-key-pem.getter.port';
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
    {
      provide: PrivateKeyPemGetterPort,
      inject: [JwksConfigPort, LocalFilePathResolverPort],
      useFactory: (
        jwksConfig: JwksConfigPort,
        localFilePathResolver: LocalFilePathResolverPort,
      ): Promise<PrivateKeyPemGetterPort> => {
        return inWebContainer<PrivateKeyPemGetterPort>({
          loadIfTrue: async () => {
            const { PrivateKeyPemGetterHardCodedAdapter } = await import(
              '../../../../../shared/jwks/modules/local/infrastructure/adapters/private-key-pem.getter.hard-coded-adapter'
            );
            return new PrivateKeyPemGetterHardCodedAdapter();
          },
          loadIfFalse: async () => {
            const { PrivateKeyPemGetterFsAdapter } = await import(
              '../../../../../shared/jwks/modules/local/infrastructure/adapters/private-key-pem.getter.fs-adapter'
            );
            return new PrivateKeyPemGetterFsAdapter(
              jwksConfig,
              localFilePathResolver,
            );
          },
        });
      },
    },
  ],
  exports: [JwtSignConfigGetterPort, JwksConfigPort, PrivateKeyPemGetterPort],
})
export class AuthConfModule {}
