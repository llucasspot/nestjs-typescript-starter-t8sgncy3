import { Module } from '@nestjs/common';
import { AuthMicroserviceConfigGetterPort } from '../domain/auth-microservice-config.getter.port';
import { UserProjectsMicroserviceConfigGetterPort } from '../domain/user-projects-microservice-config.getter.port';
import { AuthMicroserviceConfigGetterEnvAdapter } from './adapters/auth-microservice-config.getter.env-adapter';
import { UserProjectsMicroserviceConfigGetterEnvAdapter } from './adapters/user-projects-microservice-config.getter.env-adapter';

@Module({
  providers: [
    {
      provide: AuthMicroserviceConfigGetterPort,
      useClass: AuthMicroserviceConfigGetterEnvAdapter,
    },
    {
      provide: UserProjectsMicroserviceConfigGetterPort,
      useClass: UserProjectsMicroserviceConfigGetterEnvAdapter,
    },
  ],
  exports: [
    AuthMicroserviceConfigGetterPort,
    UserProjectsMicroserviceConfigGetterPort,
  ],
})
export class ConfigModule {}
