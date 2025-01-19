import { Module } from '@nestjs/common';
import { PublicKeyGetterAsyncAdapter } from '../infrastructure/adapters/public-key-getter-async/public-key.getter.async-adapter';
import { KeyGettersGetterModule } from '../infrastructure/key-getters.getter.module';
import { PublicKeyGetterPort } from './public-key.getter.port';

@Module({
  imports: [KeyGettersGetterModule],
  providers: [
    {
      provide: PublicKeyGetterPort,
      useExisting: PublicKeyGetterAsyncAdapter,
    },
  ],
  exports: [PublicKeyGetterPort],
})
export class PublicKeyGetterApiModule {}
