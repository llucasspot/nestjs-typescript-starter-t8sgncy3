import { Module } from '@nestjs/common';
import { KlassesModuleLocal } from '../../klasses/modules/local/infrastructure/klasses.module.local';
import { UserProjectsModuleLocal } from '../../user-projects/modules/local/infrastructure/user-projects.module.local';
import { CurrentUserProjectKlassesController } from './controllers/current-user-project-klasses.controller';
import { CurrentUserProjectsController } from './controllers/current-user-projects.controller';

@Module({
  imports: [UserProjectsModuleLocal, KlassesModuleLocal],
  controllers: [
    CurrentUserProjectsController,
    CurrentUserProjectKlassesController,
  ],
})
export class CurrentUserProjectsModule {}
