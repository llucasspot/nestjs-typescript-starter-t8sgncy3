import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { AuthModule } from './services/auth/infrastructure/auth.module';
import { CurrentUserProjectsModule } from './services/current-user-projects/infrastructure/current-user-projects.module';
import { CurrentUserSchoolsModule } from './services/current-user-schools/infrastructure/current-user-schools.module';
import { CurrentUserModule } from './services/current-user/infrastructure/current-user.module';
import { ProjectModule } from './services/project/infrastructure/project.module';
import { UserProjectsModule } from './services/user-projects/infrastructure/user-projects.module';
import { UserSchoolsModule } from './services/user-schools/infrastructure/user-schools.module';

@Module({
  imports: [
    AppModule,
    AuthModule,
    ProjectModule,
    CurrentUserModule,
    UserProjectsModule,
    UserSchoolsModule,
    CurrentUserProjectsModule,
    CurrentUserSchoolsModule,
  ],
})
export class MainModule {}
