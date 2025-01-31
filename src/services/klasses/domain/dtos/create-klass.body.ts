import { OmitType, PickType } from '@nestjs/swagger';
import { KlassEntity } from '../../modules/local/domain/klass.entity';

export class CreateKlassBody extends PickType(KlassEntity, [
  'name',
  'projectId',
]) {}

export class CreateProjectKlassBody extends OmitType(CreateKlassBody, [
  'projectId',
]) {}
