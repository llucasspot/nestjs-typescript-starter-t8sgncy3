import { Module } from '@nestjs/common';
import { ProjectRepositoryPort } from '../../../domain/ports/project-repository.port';
import { ProjectRepositorySequelizeAdapter } from './adapters/project.repository.sequelize-adapter';

@Module({
  providers: [
    {
      provide: ProjectRepositoryPort,
      useClass: ProjectRepositorySequelizeAdapter,
    },
  ],
  exports: [ProjectRepositoryPort],
})
export class ProjectSequelizeModule {}
