import { PickType } from '@nestjs/swagger';
import { ProjectEntity } from '../../modules/local/domain/project.entity';

export class CreateProjectDto extends PickType(ProjectEntity, [
  'name',
  'shotDate',
  'orderEndDate',
  'messageForClients',
  'schoolId',
]) {}
