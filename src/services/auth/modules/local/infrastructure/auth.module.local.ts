import { Module } from '@nestjs/common';
import { HashingModule } from '../../../../../shared/hashing/infrastructure/hashing.module';
import { AuthMicroserviceServicePort } from '../../../domain/auth-microservice.service.port';
import { AuthServicePort } from '../../../domain/auth.service.port';
import { AuthMicroserviceServiceLocalAdapter } from './adapters/auth-microservice.service.local-adapter';
import { AuthServiceLocalAdapter } from './adapters/auth.service.local-adapter';
import { AuthDatabaseModule } from './database/auth.database.module';
import { JwtModuleRegister } from './jwt-module.register';

@Module({
  imports: [JwtModuleRegister(), HashingModule, AuthDatabaseModule],
  providers: [
    {
      provide: AuthServicePort,
      useClass: AuthServiceLocalAdapter,
    },
    {
      provide: AuthMicroserviceServicePort,
      useClass: AuthMicroserviceServiceLocalAdapter,
    },
  ],
  exports: [AuthServicePort, AuthMicroserviceServicePort],
})
export class AuthModuleLocal {}
