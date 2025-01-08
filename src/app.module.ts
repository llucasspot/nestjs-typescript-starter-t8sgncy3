import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, AuthModule, ProjectModule],
})
export class AppModule {}
