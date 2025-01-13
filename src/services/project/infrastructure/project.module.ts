import { Module } from '@nestjs/common';
import { ProjectModuleLocal } from '../modules/local/infrastructure/project.module.local';
import { ProjectController } from './controllers/project.controller';

@Module({
  imports: [ProjectModuleLocal],
  controllers: [ProjectController],
})
export class ProjectModule {}
