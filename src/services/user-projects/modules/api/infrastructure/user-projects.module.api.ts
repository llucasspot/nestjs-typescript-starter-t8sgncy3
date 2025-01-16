import { Module } from '@nestjs/common';
import { MicroserviceGuardModule } from '../../../../../shared/jwt-guard/microservice-guard/infrastructure/microservice.guard.module';
import { UserProjectsServicePort } from '../../../domain/user-projects.service.port';
import { UserProjectsServiceApiAdapter } from './adapters/user-projects.service.api-adapter';

@Module({
  imports: [MicroserviceGuardModule],
  providers: [
    {
      provide: UserProjectsServicePort,
      useClass: UserProjectsServiceApiAdapter,
    },
  ],
  exports: [UserProjectsServicePort],
})
export class UserProjectsModuleApi {}
