import { Module } from '@nestjs/common';
import { UserProjectsModuleLocal } from '../modules/local/infrastructure/user-projects.module.local';
import { UserProjectsController } from './controllers/user-projects.controller';

@Module({
  imports: [UserProjectsModuleLocal],
  controllers: [UserProjectsController],
})
export class UserProjectsModule {}
