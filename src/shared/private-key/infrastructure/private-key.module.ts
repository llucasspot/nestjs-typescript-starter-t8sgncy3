import { Module } from '@nestjs/common';
import { CreateJwksModuleLocal } from '../../jwks/modules/local/infrastructure/create-jwks.module.local';
import { SignJwkGetterPort } from '../domain/sign-jwk.getter.port';
import { SignJwkGetterLocalAdapter } from './adapters/sign-jwk.getter.local-adapter';

@Module({
  imports: [CreateJwksModuleLocal],
  providers: [
    {
      provide: SignJwkGetterPort,
      useClass: SignJwkGetterLocalAdapter,
    },
  ],
  exports: [SignJwkGetterPort],
})
export class PrivateKeyModule {}
