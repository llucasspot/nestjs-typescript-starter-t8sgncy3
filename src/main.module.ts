import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { AuthModule } from './services/auth/infrastructure/auth.module';
import { CurrentUserProjectsModule } from './services/current-user-projects/infrastructure/current-user-projects.module';
import { CurrentUserModule } from './services/current-user/infrastructure/current-user.module';
import { ProjectModule } from './services/project/infrastructure/project.module';
import { UserProjectsModule } from './services/user-projects/infrastructure/user-projects.module';

@Module({
  imports: [
    AppModule,
    AuthModule,
    ProjectModule,
    UserProjectsModule,
    CurrentUserProjectsModule,
    CurrentUserModule,
  ],
})
export class MainModule {}
