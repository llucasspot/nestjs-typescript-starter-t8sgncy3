import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateKlassBody {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  projectId: string;
}

export class CreateProjectKlassBody extends OmitType(CreateKlassBody, [
  'projectId',
]) {}
