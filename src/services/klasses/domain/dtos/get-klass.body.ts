import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetKlassBody {
  @Expose()
  @IsOptional()
  id?: string | string[];

  @Expose()
  @IsOptional()
  name?: string | string[];

  @Expose()
  @IsOptional()
  projectId?: string | string[];
}

export class GetProjectKlassBody extends OmitType(GetKlassBody, [
  'projectId',
]) {}
