import { Module } from '@nestjs/common';
import { AuthMicroserviceConfigGetterPort } from '../domain/auth-microservice-config.getter.port';
import { AuthMicroserviceConfigGetterEnvAdapter } from './adapters/auth-microservice-config.getter.env-adapter';

@Module({
  providers: [
    {
      provide: AuthMicroserviceConfigGetterPort,
      useClass: AuthMicroserviceConfigGetterEnvAdapter,
    },
  ],
  exports: [AuthMicroserviceConfigGetterPort],
})
export class ConfigModule {}
