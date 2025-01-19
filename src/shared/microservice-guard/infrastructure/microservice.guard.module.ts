import { Module } from '@nestjs/common';
import { AuthModuleLocal } from '../../../services/auth/modules/local/infrastructure/auth.module.local';
import { JwtConfigModule } from '../../jwt-guard/infrastructure/jwt.config.module';
import { PublicKeyGetterLocalModule } from '../../key-getters-getter/public-key-getter/public-key-getter.local-module';
import { MicroserviceTokenGetterAuthServiceAdapter } from './adapters/microservice-token.getter.auth-service-adapter';
import { MicroserviceTokenGetterPort } from '../domain/microservice-token.getter.port';
import { MicroserviceGuard } from './strategy/microservice.guard';
import { MicroserviceStrategy } from './strategy/microservice.strategy';

@Module({
  imports: [JwtConfigModule, AuthModuleLocal, PublicKeyGetterLocalModule],
  providers: [
    MicroserviceStrategy,
    MicroserviceGuard,
    {
      provide: MicroserviceTokenGetterPort,
      useClass: MicroserviceTokenGetterAuthServiceAdapter,
    },
  ],
  exports: [MicroserviceTokenGetterPort],
})
export class MicroserviceGuardModule {}
