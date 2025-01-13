import { Module } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/user-repository.port';
import { SequelizeUserRepository } from './sequelize/adapters/user.repository.sequelize-adapter';

@Module({
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: SequelizeUserRepository,
    },
  ],
  exports: [UserRepositoryPort],
})
export class DatabaseModule {}
