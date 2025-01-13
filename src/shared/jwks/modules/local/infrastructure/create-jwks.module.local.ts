import { Module } from '@nestjs/common';
import { inWebContainer } from '../../../../hashing/infrastructure/in-web-container';
import { JwkCreatorPort } from '../domain/jwk.creator.port';
import { CreateJwkUseCase } from '../application/create-jwk.use-case';

@Module({
  imports: [],
  providers: [
    CreateJwkUseCase,
    {
      provide: JwkCreatorPort,
      useFactory: async (): Promise<JwkCreatorPort> => {
        return inWebContainer<JwkCreatorPort>({
          loadIfTrue: async () => {
            const { JwkCreatorJoseBrowserRuntimeAdapter } = await import(
              './adapters/jwk.creator.jose-browser-runtime-adapter'
            );
            return new JwkCreatorJoseBrowserRuntimeAdapter();
          },
          loadIfFalse: async () => {
            const { JwkCreatorJoseAdapter } = await import(
              './adapters/jwk.creator.jose-adapter'
            );
            return new JwkCreatorJoseAdapter();
          },
        });
      },
    },
  ],
  exports: [CreateJwkUseCase],
})
export class CreateJwksModuleLocal {}
