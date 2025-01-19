import { Module } from '@nestjs/common';
import { JwksModuleLocal } from '../../../shared/jwks/modules/local/infrastructure/jwks.module.local';
import { AuthController } from './controllers/auth.controller';
import { JwksController } from './controllers/jwks.controller';
import { AuthModuleLocal } from '../modules/local/infrastructure/auth.module.local';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [AuthModuleLocal, JwksModuleLocal],
  controllers: [AuthController, UsersController, JwksController],
})
export class AuthModule {}
