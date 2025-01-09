import { Module } from '@nestjs/common';
import { SesuelizeDatabaseModule } from './sequelize/sequelize.database.module';

@Module({
  providers: [SesuelizeDatabaseModule],
  exports: [SesuelizeDatabaseModule],
})
export class DatabaseModule {}
