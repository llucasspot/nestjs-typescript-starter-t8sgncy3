import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class KlassEntity {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  projectId: string;
}
