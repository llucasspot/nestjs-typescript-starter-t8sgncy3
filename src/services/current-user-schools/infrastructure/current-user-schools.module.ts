import { Module } from '@nestjs/common';
import { UserSchoolsModuleLocal } from '../../user-schools/modules/local/infrastructure/user-schools.module.local';
import { CurrentUserSchoolsController } from './controllers/current-user-schools.controller';

@Module({
  imports: [UserSchoolsModuleLocal],
  controllers: [CurrentUserSchoolsController],
})
export class CurrentUserSchoolsModule {}
