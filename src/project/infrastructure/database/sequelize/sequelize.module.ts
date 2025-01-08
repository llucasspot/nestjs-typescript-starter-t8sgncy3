import { Module } from '@nestjs/common';
import { ProjectSequelizeDatabaseService } from './project.sequelize.database.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [ProjectSequelizeDatabaseService],
})
export class SequelizeModule {}
