import { Module } from '@nestjs/common';
import { AuthSequelizeModule } from './sequelize/auth.sequelize.module';

@Module({
  imports: [AuthSequelizeModule],
  exports: [AuthSequelizeModule],
})
export class AuthDatabaseModule {}
