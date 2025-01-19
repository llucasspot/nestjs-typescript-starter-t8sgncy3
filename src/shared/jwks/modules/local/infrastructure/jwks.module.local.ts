import { Module } from '@nestjs/common';
import { AuthConfModule } from '../../../../../services/auth/modules/local/infrastructure/auth-conf.module';
import { LocalFilePathResolverPort } from '../../../../file/local-file-path.resolver.port';
import { inWebContainer } from '../../../../hashing/infrastructure/in-web-container';
import { JwksServicePort } from '../../../domain/jwks.service.port';
import { JwksServiceLocalAdapter } from '../application/jwks.service.local-adapter';
import { PublicKeyPemGetterPort } from '../application/public-key-pem.getter.port';
import { JwkFromPublicKeyPemExtractorPort } from '../domain/jwk-from-public-key-pem.extractor.port';
import { JwksConfigPort } from '../domain/jwks-config.port';

@Module({
  imports: [AuthConfModule],
  providers: [
    {
      provide: JwksServicePort,
      useClass: JwksServiceLocalAdapter,
    },
    {
      provide: PublicKeyPemGetterPort,
      inject: [JwksConfigPort, LocalFilePathResolverPort],
      useFactory: (
        jwksConfig: JwksConfigPort,
        localFilePathResolver: LocalFilePathResolverPort,
      ): Promise<PublicKeyPemGetterPort> => {
        return inWebContainer<PublicKeyPemGetterPort>({
          loadIfTrue: async () => {
            const { PublicKeyPemGetterHardCodedAdapter } = await import(
              './adapters/public-key-pem.getter.hard-coded-adapter'
            );
            return new PublicKeyPemGetterHardCodedAdapter();
          },
          loadIfFalse: async () => {
            const { PublicKeyPemGetterFsAdapter } = await import(
              './adapters/public-key-pem.getter.fs-adapter'
            );
            return new PublicKeyPemGetterFsAdapter(
              jwksConfig,
              localFilePathResolver,
            );
          },
        });
      },
    },
    {
      provide: JwkFromPublicKeyPemExtractorPort,
      useFactory: (): Promise<JwkFromPublicKeyPemExtractorPort> => {
        return inWebContainer<JwkFromPublicKeyPemExtractorPort>({
          loadIfTrue: async () => {
            const { JwkFromPublicKeyPemExtractorForgeNodeAdapter } =
              await import(
                './adapters/jwk-from-public-key-pem.extractor.forge-node-adapter'
              );
            return new JwkFromPublicKeyPemExtractorForgeNodeAdapter();
          },
          loadIfFalse: async () => {
            const { JwkFromPublicKeyPemExtractorJoseAdapter } = await import(
              './adapters/jwk-from-public-key-pem.extractor.jose-adapter'
            );
            return new JwkFromPublicKeyPemExtractorJoseAdapter();
          },
        });
      },
    },
  ],
  exports: [JwksServicePort],
})
export class JwksModuleLocal {}
