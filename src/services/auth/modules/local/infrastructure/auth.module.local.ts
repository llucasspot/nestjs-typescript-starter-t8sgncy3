import { Module } from '@nestjs/common';
import { HashingModule } from '../../../../../shared/hashing/infrastructure/hashing.module';
import { AuthServicePort } from '../../../domain/auth.service.port';
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
  ],
  exports: [AuthServicePort],
})
export class AuthModuleLocal {}
