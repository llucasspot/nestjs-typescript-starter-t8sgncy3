import { PartialType, PickType } from '@nestjs/swagger';
import { SchoolDto } from './school.dto';

export class UpdateSchoolDto extends PartialType(
  PickType(SchoolDto, ['name', 'currency', 'city']),
) {}
