import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/infrastructure/config.module';
import { SesuelizeDatabaseModule } from './database/infrastructure/sequelize/sequelize.database.module';
import { FileModule } from './file/file.module';

@Global()
@Module({
  imports: [ConfigModule, SesuelizeDatabaseModule, FileModule],
  exports: [ConfigModule, SesuelizeDatabaseModule, FileModule],
})
export class SharedModule {}
