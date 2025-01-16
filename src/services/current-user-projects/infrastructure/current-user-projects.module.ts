import { Module } from '@nestjs/common';
import { UserProjectsModuleLocal } from '../../user-projects/modules/local/infrastructure/user-projects.module.local';
import { CurrentUserProjectsController } from './controllers/current-user-projects.controller';

@Module({
  imports: [UserProjectsModuleLocal],
  controllers: [CurrentUserProjectsController],
})
export class CurrentUserProjectsModule {}
