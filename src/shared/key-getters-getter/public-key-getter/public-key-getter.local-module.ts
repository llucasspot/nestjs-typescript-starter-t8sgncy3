import { Module } from '@nestjs/common';
import { PublicKeyGetterSyncAdapter } from '../infrastructure/adapters/public-key-getter-sync/public-key.getter.sync-adapter';
import { KeyGettersGetterModule } from '../infrastructure/key-getters.getter.module';
import { PublicKeyGetterPort } from './public-key.getter.port';

@Module({
  imports: [KeyGettersGetterModule],
  providers: [
    {
      provide: PublicKeyGetterPort,
      useExisting: PublicKeyGetterSyncAdapter,
    },
  ],
  exports: [PublicKeyGetterPort],
})
export class PublicKeyGetterLocalModule {}
