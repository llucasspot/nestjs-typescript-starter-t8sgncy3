import { Module } from '@nestjs/common';
import { ProjectModuleLocal } from '../modules/local/infrastructure/project.module.local';
import { ProjectController } from './controllers/project.controller';
import { SchoolsController } from './controllers/schools.controller';

@Module({
  imports: [ProjectModuleLocal],
  controllers: [ProjectController, SchoolsController],
})
export class ProjectModule {}
