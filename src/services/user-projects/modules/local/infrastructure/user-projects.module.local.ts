import { Module } from '@nestjs/common';
import { ProjectModuleLocal } from '../../../../project/modules/local/infrastructure/project.module.local';
import { UserProjectsServicePort } from '../../../domain/user-projects.service.port';
import { UserProjectsServiceLocalAdapter } from './adapters/user-projects.service.local-adapter';
import { UserProjectsDatabaseModule } from './database/user-projects.database.module';

@Module({
  imports: [ProjectModuleLocal, UserProjectsDatabaseModule],
  providers: [
    {
      provide: UserProjectsServicePort,
      useClass: UserProjectsServiceLocalAdapter,
    },
  ],
  exports: [UserProjectsServicePort],
})
export class UserProjectsModuleLocal {}
