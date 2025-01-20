import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductDto } from '../../../products/domain/product.dto';

export class ProjectProductDto {
  @IsString()
  id!: string;

  @IsString()
  projectId!: string;

  @IsString()
  productId!: string;

  @Min(0)
  @IsNumber()
  @Type(() => Number)
  price!: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  product?: ProductDto;
}
