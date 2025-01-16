import { Module } from '@nestjs/common';
import { MicroserviceGuardModule } from '../../../shared/jwt-guard/microservice-guard/infrastructure/microservice.guard.module';
import { UserProjectsModuleLocal } from '../modules/local/infrastructure/user-projects.module.local';
import { UserProjectsController } from './controllers/user-projects.controller';

@Module({
  imports: [MicroserviceGuardModule, UserProjectsModuleLocal],
  controllers: [UserProjectsController],
})
export class UserProjectsModule {}
