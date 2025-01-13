import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwksController } from './controllers/jwks.controller';
import { AuthModuleLocal } from '../modules/local/infrastructure/auth.module.local';

@Module({
  controllers: [AuthController, JwksController],
  imports: [AuthModuleLocal],
})
export class AuthModule {}
