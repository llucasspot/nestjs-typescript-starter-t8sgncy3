import { Module } from '@nestjs/common';
import { ProjectController } from './infrastructure/controllers/project.controller';
import { ProjectService } from './application/services/project.service';
import { ProjectRepositoryPort } from './domain/ports/project-repository.port';
import { SequelizeProjectRepository } from './infrastructure/adapters/sequelize-project.repository';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  controllers: [ProjectController],
  imports: [DatabaseModule],
  providers: [
    ProjectService,
    {
      provide: ProjectRepositoryPort,
      useClass: SequelizeProjectRepository,
    },
  ],
})
export class ProjectModule {}
