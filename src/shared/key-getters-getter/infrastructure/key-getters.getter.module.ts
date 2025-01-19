import { Module } from '@nestjs/common';
import { AuthConfModule } from '../../../services/auth/modules/local/infrastructure/auth-conf.module';
import { PrivateKeyPemGetterFsAdapter } from '../../jwks/modules/local/infrastructure/adapters/private-key-pem.getter.fs-adapter';
import { PrivateKeyPemGetterSyncAdapter } from '../../jwks/modules/local/infrastructure/adapters/private-key-pem.getter.sync-adapter';
import { JwksModuleLocal } from '../../jwks/modules/local/infrastructure/jwks.module.local';
import { KeyGettersGetter } from '../domain/key-getters.getter';
import { JwtHeaderExtractorPort } from '../domain/ports/jwt-header.extractor.port';
import { PublicKeyFromJwksExtractorPort } from '../domain/ports/public-key-from-jwks.extractor.port';
import { JwtHeaderExtractorJsonwebtokenAdapter } from './adapters/public-key-getter-async/adapters/jwt-header.extractor.jsonwebtoken-adapter';
import { PublicKeyFromJwksExtractorJwkToPemAdapter } from './adapters/public-key-getter-async/adapters/public-key-from-jwks.extractor.jwk-to-pem-adapter';
import { PublicKeyGetterAsyncAdapter } from './adapters/public-key-getter-async/public-key.getter.async-adapter';
import { PublicKeyGetterSyncAdapter } from './adapters/public-key-getter-sync/public-key.getter.sync-adapter';

@Module({
  imports: [JwksModuleLocal, AuthConfModule],
  providers: [
    KeyGettersGetter,
    PublicKeyGetterAsyncAdapter,
    PrivateKeyPemGetterFsAdapter,
    PublicKeyGetterSyncAdapter,
    PrivateKeyPemGetterSyncAdapter,
    {
      provide: JwtHeaderExtractorPort,
      useClass: JwtHeaderExtractorJsonwebtokenAdapter,
    },
    {
      provide: PublicKeyFromJwksExtractorPort,
      useClass: PublicKeyFromJwksExtractorJwkToPemAdapter,
    },
  ],
  exports: [
    KeyGettersGetter,
    PublicKeyGetterAsyncAdapter,
    PublicKeyGetterSyncAdapter,
  ],
})
export class KeyGettersGetterModule {}
