import { Module } from '@nestjs/common';
import { AuthModule } from './services/auth/auth.module';
import { ProjectModule } from './services/project/project.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, AuthModule, ProjectModule],
})
export class AppModule {}
