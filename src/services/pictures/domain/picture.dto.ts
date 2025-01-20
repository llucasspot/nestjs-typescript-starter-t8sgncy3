import { Expose } from 'class-transformer';

export class PictureDto {
  @Expose()
  id: string;
}
