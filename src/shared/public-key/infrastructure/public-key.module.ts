import { Module } from '@nestjs/common';
import { inWebContainer } from '../../hashing/infrastructure/in-web-container';
import { JwksModuleLocal } from '../../jwks/modules/local/infrastructure/jwks.module.local';
import { JwtHeaderExtractorPort } from '../domain/ports/jwt-header.extractor.port';
import { PublicKeyFromJwksExtractorPort } from '../domain/ports/public-key-from-jwks.extractor.port';
import { PublicKeyGetter } from '../domain/public-key.getter';

@Module({
  imports: [JwksModuleLocal],
  providers: [
    PublicKeyGetter,
    {
      provide: JwtHeaderExtractorPort,
      useFactory: async (): Promise<JwtHeaderExtractorPort> => {
        return inWebContainer<JwtHeaderExtractorPort>({
          loadIfTrue: async () => {
            const { JwtHeaderExtractorJoseBrowserRuntimeAdapter } =
              await import(
                './adapters/jwt-header.extractor.jose-browser-runtime-adapter'
              );
            return new JwtHeaderExtractorJoseBrowserRuntimeAdapter();
          },
          loadIfFalse: async () => {
            const { JwtHeaderExtractorJoseAdapter } = await import(
              './adapters/jwt-header.extractor.jose-adapter'
            );
            return new JwtHeaderExtractorJoseAdapter();
          },
        });
      },
    },
    {
      provide: PublicKeyFromJwksExtractorPort,
      useFactory: async (): Promise<PublicKeyFromJwksExtractorPort> => {
        return inWebContainer<PublicKeyFromJwksExtractorPort>({
          loadIfTrue: async () => {
            const { PublicKeyFromJwksExtractorJoseBrowserRuntimeAdapter } =
              await import(
                './adapters/public-key-from-jwks.extractor.jose-browser-runtime-adapter'
              );
            return new PublicKeyFromJwksExtractorJoseBrowserRuntimeAdapter();
          },
          loadIfFalse: async () => {
            const { PublicKeyFromJwksExtractorJoseAdapter } = await import(
              './adapters/public-key-from-jwks.extractor.jose-adapter'
            );
            return new PublicKeyFromJwksExtractorJoseAdapter();
          },
        });
      },
    },
  ],
  exports: [PublicKeyGetter],
})
export class PublicKeyModule {}
