import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { AvailableCurrency } from '../../project/modules/local/domain/school.entity';

export class GetSchoolBody {
  @Expose()
  @IsOptional()
  id?: string | string[];

  @Expose()
  @IsOptional()
  name?: string | string[];

  @Expose()
  @IsOptional()
  currency?: AvailableCurrency | AvailableCurrency[];

  @Expose()
  @IsOptional()
  city?: string | string[];
}
