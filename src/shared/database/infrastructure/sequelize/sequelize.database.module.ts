import { Module } from '@nestjs/common';
import { SequelizeDatabaseService } from './sequelize.database.service';

@Module({
  providers: [SequelizeDatabaseService],
  exports: [SequelizeDatabaseService],
})
export class SesuelizeDatabaseModule {}
