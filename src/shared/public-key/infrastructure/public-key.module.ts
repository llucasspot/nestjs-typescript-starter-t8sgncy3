import { Module } from '@nestjs/common';
import { JwtHeaderExtractorPort } from '../domain/ports/jwt-header.extractor.port';
import { PublicKeyFromJwksExtractorPort } from '../domain/ports/public-key-from-jwks.extractor.port';
import { PublicKeyGetter } from '../domain/public-key.getter';
import { JwtHeaderExtractorJoseAdapter } from './adapters/jwt-header.extractor.jose-adapter';
import { PublicKeyFromJwksExtractorJoseAdapter } from './adapters/public-key-from-jwks.extractor.jose-adapter';

@Module({
  imports: [],
  providers: [
    PublicKeyGetter,
    {
      provide: JwtHeaderExtractorPort,
      useClass: JwtHeaderExtractorJoseAdapter,
    },
    {
      provide: PublicKeyFromJwksExtractorPort,
      useClass: PublicKeyFromJwksExtractorJoseAdapter,
    },
  ],
  exports: [PublicKeyGetter],
})
export class PublicKeyModule {}
