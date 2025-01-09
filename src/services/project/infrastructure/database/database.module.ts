import { Module } from '@nestjs/common';
import { SequelizeModule } from './sequelize/sequelize.module';

@Module({
  imports: [SequelizeModule],
})
export class DatabaseModule {}
