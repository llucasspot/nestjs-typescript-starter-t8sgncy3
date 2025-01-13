import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/infrastructure/config.module';
import { SesuelizeDatabaseModule } from './database/infrastructure/sequelize/sequelize.database.module';

@Global()
@Module({
  imports: [ConfigModule, SesuelizeDatabaseModule],
  exports: [ConfigModule, SesuelizeDatabaseModule],
})
export class SharedModule {}
