import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { ProjectEntity } from '../../modules/local/domain/project.entity';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(
  IntersectionType(CreateProjectDto, PickType(ProjectEntity, ['state'])),
) {}
