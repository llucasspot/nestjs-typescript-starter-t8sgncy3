import { Module } from '@nestjs/common';
import { AppConfigPort } from './domain/ports/app-config.port';
import { SwaggerConfigPort } from './domain/ports/swagger-config.port';
import { AppConfigProcessEnvAdapter } from './infrastructure/app-config.process-env-adapter';
import { SwaggerConfigProcessEnvAdapter } from './infrastructure/swagger-config.process-env-adapter';

@Module({
  imports: [],
  providers: [
    {
      provide: AppConfigPort,
      useClass: AppConfigProcessEnvAdapter,
    },
    {
      provide: SwaggerConfigPort,
      useClass: SwaggerConfigProcessEnvAdapter,
    },
  ],
  exports: [SwaggerConfigPort, AppConfigPort],
})
export class AppModule {}
