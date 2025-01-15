import { Module } from '@nestjs/common';
import { AuthConfModule } from '../../../../../services/auth/modules/local/infrastructure/auth-conf.module';
import { inWebContainer } from '../../../../hashing/infrastructure/in-web-container';
import { JwksServicePort } from '../../../domain/jwks.service.port';
import { JwksServiceLocalAdapter } from '../application/jwks.service.local-adapter';
import { PublicKeyPemGetter } from '../application/public-key-pem.getter';
import { JwkFromPublicKeyPemExtractorPort } from '../domain/jwk-from-public-key-pem.extractor.port';

@Module({
  imports: [AuthConfModule],
  providers: [
    {
      provide: JwksServicePort,
      useClass: JwksServiceLocalAdapter,
    },
    PublicKeyPemGetter,
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
