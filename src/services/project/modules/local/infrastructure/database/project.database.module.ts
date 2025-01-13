import { Module } from '@nestjs/common';
import { ProjectSequelizeModule } from './sequelize/project.sequelize.module';

@Module({
  imports: [ProjectSequelizeModule],
  exports: [ProjectSequelizeModule],
})
export class ProjectDatabaseModule {}
