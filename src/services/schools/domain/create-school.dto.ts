import { PickType } from '@nestjs/swagger';
import { SchoolDto } from './school.dto';

export class CreateSchoolDto extends PickType(SchoolDto, [
  'name',
  'currency',
  'city',
]) {}
