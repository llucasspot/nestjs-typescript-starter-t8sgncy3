import { Module } from '@nestjs/common';
import { ProjectModuleLocal } from '../../../../project/modules/local/infrastructure/project.module.local';
import { UserSchoolsServicePort } from '../../../domain/user-schools.service.port';
import { UserSchoolsServiceLocalAdapter } from './adapters/user-schools.service.local-adapter';
import { UserSchoolsDatabaseModule } from './database/user-schools.database.module';

@Module({
  imports: [ProjectModuleLocal, UserSchoolsDatabaseModule],
  providers: [
    {
      provide: UserSchoolsServicePort,
      useClass: UserSchoolsServiceLocalAdapter,
    },
  ],
  exports: [UserSchoolsServicePort],
})
export class UserSchoolsModuleLocal {}
