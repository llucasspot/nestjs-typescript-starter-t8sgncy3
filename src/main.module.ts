import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { AuthModule } from './services/auth/infrastructure/auth.module';
import { ProjectModule } from './services/project/project.module';

@Module({
  imports: [AuthModule, ProjectModule, AppModule],
})
export class MainModule {}
