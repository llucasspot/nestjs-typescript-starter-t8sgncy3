import { PartialType } from '@nestjs/swagger';
import { CreateSchoolBody } from './create-school.body';

export class UpdateSchoolBody extends PartialType(CreateSchoolBody) {}
