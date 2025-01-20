import { Module } from '@nestjs/common';
import { MicroserviceGuardModule } from '../../../shared/microservice-guard/infrastructure/microservice.guard.module';
import { UserSchoolsModuleLocal } from '../modules/local/infrastructure/user-schools.module.local';
import { UserSchoolsController } from './controllers/user-schools.controller';

@Module({
  imports: [MicroserviceGuardModule, UserSchoolsModuleLocal],
  controllers: [UserSchoolsController],
})
export class UserSchoolsModule {}
