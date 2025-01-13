import { Module } from '@nestjs/common';
import { HashingPort } from '../domain/hashing.port';

@Module({
  imports: [],
  providers: [
    {
      provide: HashingPort,
      useFactory: async (): Promise<HashingPort> => {
        const inWebContainer = true;
        if (inWebContainer) {
          const { BcryptJsHashingAdapter } = await import(
            './adapters/bcryptjs-hashing.adapter'
          );
          return new BcryptJsHashingAdapter();
        } else {
          const { BcryptHashingAdapter } = await import(
            './adapters/bcrypt-hashing.adapter'
          );
          return new BcryptHashingAdapter();
        }
      },
    },
  ],
  exports: [HashingPort],
})
export class HashingModule {}
