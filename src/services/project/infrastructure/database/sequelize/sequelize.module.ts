import { Module } from '@nestjs/common';
import { ProjectSequelizeDatabaseService } from './project.sequelize.database.service';

@Module({
  providers: [ProjectSequelizeDatabaseService],
})
export class SequelizeModule {}
