import { Module } from '@nestjs/common';
import { AuthConfModule } from '../../../../../services/auth/modules/local/infrastructure/auth-conf.module';
import { inWebContainer } from '../../../../hashing/infrastructure/in-web-container';
import { JwksServicePort } from '../../../domain/jwks.service.port';
import { JwksServiceLocalAdapter } from '../application/jwks.service.local-adapter';
import { PublicKeyPemGetterPort } from '../application/public-key-pem.getter.port';
import { JwkFromPublicKeyPemExtractorPort } from '../domain/jwk-from-public-key-pem.extractor.port';
import { PublicKeyPemGetterFsAdapter } from './adapters/public-key-pem.getter.fs-adapter';

@Module({
  imports: [AuthConfModule],
  providers: [
    JwksServiceLocalAdapter,
    {
      provide: JwksServicePort,
      useClass: JwksServiceLocalAdapter,
    },
    {
      provide: PublicKeyPemGetterPort,
      useClass: PublicKeyPemGetterFsAdapter,
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
  exports: [JwksServicePort, JwksServiceLocalAdapter],
})
export class JwksModuleLocal {}
