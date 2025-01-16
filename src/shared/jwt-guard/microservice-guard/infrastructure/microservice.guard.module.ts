import { Module } from '@nestjs/common';
import { AuthModuleLocal } from '../../../../services/auth/modules/local/infrastructure/auth.module.local';
import { PublicKeyModule } from '../../../public-key/infrastructure/public-key.module';
import { JwtConfigModule } from '../../infrastructure/jwt.config.module';
import { MicroserviceTokenGetterAuthServiceAdapter } from './adapters/microservice-token.getter.auth-service-adapter';
import { MicroserviceTokenGetterPort } from '../domain/microservice-token.getter.port';
import { MicroserviceGuard } from './strategy/microservice.guard';
import { MicroserviceStrategy } from './strategy/microservice.strategy';

@Module({
  imports: [JwtConfigModule, PublicKeyModule, AuthModuleLocal],
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
