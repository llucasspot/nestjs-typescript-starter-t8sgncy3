import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GuardModule } from '../shared/guard/guard.module';
import { SharedModule } from '../shared/shared.module';
import { AppConfigPort } from './domain/ports/app-config.port';
import { SwaggerConfigPort } from './domain/ports/swagger-config.port';
import { AppConfigProcessEnvAdapter } from './infrastructure/app-config.process-env-adapter';
import { AxiosErrorInterceptor } from './infrastructure/interceptors/axios.error.interceptor';
import { ErrorInterceptor } from './infrastructure/interceptors/error.interceptor';
import { SwaggerConfigProcessEnvAdapter } from './infrastructure/swagger-config.process-env-adapter';

@Module({
  imports: [GuardModule, SharedModule],
  providers: [
    {
      provide: AppConfigPort,
      useClass: AppConfigProcessEnvAdapter,
    },
    {
      provide: SwaggerConfigPort,
      useClass: SwaggerConfigProcessEnvAdapter,
    },
    AxiosErrorInterceptor,
    ErrorInterceptor,
    {
      provide: ClassSerializerInterceptor,
      inject: [Reflector],
      useFactory: (reflector) => {
        return new ClassSerializerInterceptor(reflector, {
          excludeExtraneousValues: true,
        });
      },
    },
  ],
  exports: [
    SwaggerConfigPort,
    AppConfigPort,
    AxiosErrorInterceptor,
    ErrorInterceptor,
  ],
})
export class AppModule {}
