import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateKlassBody } from './create-klass.body';

export class UpdateKlassBody extends PartialType(CreateKlassBody) {}

export class UpdateProjectKlassBody extends OmitType(UpdateKlassBody, [
  'projectId',
]) {}
