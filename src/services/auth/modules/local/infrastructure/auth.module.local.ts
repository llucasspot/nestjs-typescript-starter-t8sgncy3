import { Module } from '@nestjs/common';
import { HashingModule } from '../../../../../shared/hashing/infrastructure/hashing.module';
import { AuthMicroserviceServicePort } from '../../../domain/auth-service/auth-microservice.service.port';
import { AuthServicePort } from '../../../domain/auth-service/auth.service.port';
import { UserServicePort } from '../../../domain/user-service/user.service.port';
import { AuthMicroserviceServiceLocalAdapter } from './adapters/auth-microservice.service.local-adapter';
import { AuthServiceLocalAdapter } from './adapters/auth.service.local-adapter';
import { UserServiceLocalAdapter } from './adapters/user.service.local-adapter';
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
    {
      provide: UserServicePort,
      useClass: UserServiceLocalAdapter,
    },
  ],
  exports: [AuthServicePort, AuthMicroserviceServicePort, UserServicePort],
})
export class AuthModuleLocal {}
