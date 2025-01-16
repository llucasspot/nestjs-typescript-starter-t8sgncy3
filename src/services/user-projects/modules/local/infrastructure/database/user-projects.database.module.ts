import { Module } from '@nestjs/common';
import { UserProjectsSequelizeModule } from './sequelize/user-projects.sequelize.module';

@Module({
  imports: [UserProjectsSequelizeModule],
  exports: [UserProjectsSequelizeModule],
})
export class UserProjectsDatabaseModule {}
