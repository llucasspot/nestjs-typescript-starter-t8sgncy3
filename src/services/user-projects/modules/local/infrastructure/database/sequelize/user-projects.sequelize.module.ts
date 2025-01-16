import { Module } from '@nestjs/common';
import { UserProjectsRepositoryPort } from '../../../domain/ports/user-projects-repository.port';
import { UserProjectsRepositorySequelizeAdapter } from './adapters/user-projects.repository.sequelize-adapter';

@Module({
  providers: [
    {
      provide: UserProjectsRepositoryPort,
      useClass: UserProjectsRepositorySequelizeAdapter,
    },
  ],
  exports: [UserProjectsRepositoryPort],
})
export class UserProjectsSequelizeModule {}
