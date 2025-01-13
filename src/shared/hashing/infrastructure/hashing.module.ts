import { Module } from '@nestjs/common';
import { HashingPort } from '../domain/hashing.port';
import { inWebContainer } from './in-web-container';

@Module({
  imports: [],
  providers: [
    {
      provide: HashingPort,
      useFactory: async (): Promise<HashingPort> => {
        return await inWebContainer<HashingPort>({
          loadIfTrue: async () => {
            const { BcryptJsHashingAdapter } = await import(
              './adapters/bcryptjs-hashing.adapter'
            );
            return new BcryptJsHashingAdapter();
          },
          loadIfFalse: async () => {
            const { BcryptHashingAdapter } = await import(
              './adapters/bcrypt-hashing.adapter'
            );
            return new BcryptHashingAdapter();
          },
        });
      },
    },
  ],
  exports: [HashingPort],
})
export class HashingModule {}
