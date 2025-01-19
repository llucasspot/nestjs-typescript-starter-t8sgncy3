import { Module } from '@nestjs/common';
import { AuthModuleLocal } from '../../auth/modules/local/infrastructure/auth.module.local';
import { CurrentUserController } from './controllers/current-user.controller';

@Module({
  imports: [AuthModuleLocal],
  controllers: [CurrentUserController],
})
export class CurrentUserModule {}
