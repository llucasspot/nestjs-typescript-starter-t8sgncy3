import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class EntityDto {
  @Expose()
  @IsString()
  id: string;
}
