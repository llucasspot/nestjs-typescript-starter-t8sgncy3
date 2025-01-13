import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/infrastructure/config.module';
import { SesuelizeDatabaseModule } from './database/infrastructure/sequelize/sequelize.database.module';
import { JwksModuleLocal } from './jwks/modules/local/infrastructure/jwks.module.local';

@Global()
@Module({
  imports: [ConfigModule, SesuelizeDatabaseModule, JwksModuleLocal],
  exports: [ConfigModule, SesuelizeDatabaseModule, JwksModuleLocal],
})
export class SharedModule {}
