import { Module } from '@nestjs/common';
import { UserSchoolsSequelizeModule } from './sequelize/user-schools.sequelize.module';

@Module({
  imports: [UserSchoolsSequelizeModule],
  exports: [UserSchoolsSequelizeModule],
})
export class UserSchoolsDatabaseModule {}
