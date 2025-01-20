import { Module } from '@nestjs/common';
import { ProjectRepositoryPort } from '../../../domain/ports/project-repository.port';
import { SchoolRepositoryPort } from '../../../domain/ports/school-repository.port';
import { ProjectRepositorySequelizeAdapter } from './adapters/project.repository.sequelize-adapter';
import { SchoolRepositorySequelizeAdapter } from './adapters/school.repository.sequelize-adapter';

@Module({
  providers: [
    {
      provide: ProjectRepositoryPort,
      useClass: ProjectRepositorySequelizeAdapter,
    },
    {
      provide: SchoolRepositoryPort,
      useClass: SchoolRepositorySequelizeAdapter,
    },
  ],
  exports: [ProjectRepositoryPort, SchoolRepositoryPort],
})
export class ProjectSequelizeModule {}
