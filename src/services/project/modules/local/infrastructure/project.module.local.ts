import { Module } from '@nestjs/common';
import { ProjectServicePort } from '../../../domain/project.service.port';
import { SchoolsServicePort } from '../../../domain/schools.service.port';
import { ProjectEmitterPort } from '../domain/ports/project.emitter.port';
import { ProjectEmitterLocalAdapter } from './adapters/project.emitter.local-adapter';
import { ProjectServiceLocalAdapter } from './adapters/project.service.local-adapter';
import { SchoolsServiceLocalAdapter } from './adapters/schools.service.local-adapter';
import { ProjectDatabaseModule } from './database/project.database.module';

@Module({
  imports: [ProjectDatabaseModule],
  providers: [
    {
      provide: ProjectServicePort,
      useClass: ProjectServiceLocalAdapter,
    },
    {
      provide: SchoolsServicePort,
      useClass: SchoolsServiceLocalAdapter,
    },
    {
      provide: ProjectEmitterPort,
      useClass: ProjectEmitterLocalAdapter,
    },
  ],
  exports: [ProjectServicePort, SchoolsServicePort],
})
export class ProjectModuleLocal {}
