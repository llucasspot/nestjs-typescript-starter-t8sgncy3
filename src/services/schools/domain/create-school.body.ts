import { PickType } from '@nestjs/swagger';
import { SchoolEntity } from '../../project/modules/local/domain/school.entity';

export class CreateSchoolBody extends PickType(SchoolEntity, [
  'name',
  'currency',
  'city',
]) {}
