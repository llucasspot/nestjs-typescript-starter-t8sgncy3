import { Module, Global } from '@nestjs/common';
import { ConfigPort } from './config/domain/ports/config.port';
import { ProcessEnvConfigAdapter } from './config/infrastructure/process-env-config.adapter';
import { SesuelizeDatabaseModule } from './database/infrastructure/sequelize/sequelize.database.module';

@Global()
@Module({
  imports: [SesuelizeDatabaseModule],
  providers: [
    {
      provide: ConfigPort,
      useClass: ProcessEnvConfigAdapter,
    },
  ],
  exports: [SesuelizeDatabaseModule, ConfigPort],
})
export class SharedModule {}
