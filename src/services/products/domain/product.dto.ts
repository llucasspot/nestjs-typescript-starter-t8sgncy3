import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class ProductDto {
  @Expose()
  @IsString({ message: 'products.fields.id.IsString' })
  id!: string;
  @Expose()
  @IsString({ message: 'products.fields.name.IsString' })
  name!: string;
  @Expose()
  @IsString({ message: 'products.fields.description.IsString' })
  description!: string;
}
