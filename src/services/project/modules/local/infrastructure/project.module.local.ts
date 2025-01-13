import { Module } from '@nestjs/common';
import { ProjectServicePort } from '../../../domain/project.service.port';
import { ProjectServiceLocalAdapter } from './adapters/project.service.local-adapter';
import { ProjectDatabaseModule } from './database/project.database.module';

@Module({
  imports: [ProjectDatabaseModule],
  providers: [
    {
      provide: ProjectServicePort,
      useClass: ProjectServiceLocalAdapter,
    },
  ],
  exports: [ProjectServicePort],
})
export class ProjectModuleLocal {}
