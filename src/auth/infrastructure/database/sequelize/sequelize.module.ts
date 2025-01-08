import { Module } from '@nestjs/common';
import { AuthSequelizeDatabaseService } from './auth.sequelize.database.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [AuthSequelizeDatabaseService],
})
export class SequelizeModule {}
