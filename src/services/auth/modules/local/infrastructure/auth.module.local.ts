import { Module } from '@nestjs/common';
import { HashingModule } from '../../../../../shared/hashing/infrastructure/hashing.module';
import { AuthServicePort } from '../../../domain/auth.service.port';
import { AuthServiceLocalAdapter } from './adapters/auth.service.local-adapter';
import { DatabaseModule } from './database/database.module';
import { JwtModuleRegister } from './jwt-module.register';

@Module({
  imports: [JwtModuleRegister(), HashingModule, DatabaseModule],
  providers: [
    {
      provide: AuthServicePort,
      useClass: AuthServiceLocalAdapter,
    },
  ],
  exports: [AuthServicePort],
})
export class AuthModuleLocal {}
