import { Module } from '@nestjs/common';
import { AuthConfModule } from '../../../../../services/auth/modules/local/infrastructure/auth-conf.module';
import { JwksServicePort } from '../../../domain/jwks.service.port';
import { JwksServiceLocalAdapter } from '../application/jwks.service.local-adapter';
import { PublicKeyPemGetter } from '../application/public-key-pem.getter';
import { JwkFromPublicKeyPemExtractorPort } from '../domain/jwk-from-public-key-pem.extractor.port';
import { JwkFromPublicKeyPemExtractorJoseAdapter } from './adapters/jwk-from-public-key-pem.extractor.jose-adapter';

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
      useClass: JwkFromPublicKeyPemExtractorJoseAdapter,
    },
  ],
  exports: [JwksServicePort],
})
export class JwksModuleLocal {}
