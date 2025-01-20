import { Module } from '@nestjs/common';
import { UserSchoolsRepositoryPort } from '../../../domain/ports/user-schools-repository.port';
import { UserSchoolsRepositorySequelizeAdapter } from './adapters/user-schools.repository.sequelize-adapter';

@Module({
  providers: [
    {
      provide: UserSchoolsRepositoryPort,
      useClass: UserSchoolsRepositorySequelizeAdapter,
    },
  ],
  exports: [UserSchoolsRepositoryPort],
})
export class UserSchoolsSequelizeModule {}
