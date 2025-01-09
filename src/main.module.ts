import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { AuthModule } from './services/auth/auth.module';
import { ProjectModule } from './services/project/project.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, AuthModule, ProjectModule, AppModule],
})
export class MainModule {}
