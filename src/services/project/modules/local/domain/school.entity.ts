import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

export enum AvailableCurrency {
  EUR = 'EUR',
}

export class SchoolEntity {
  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsEnum(AvailableCurrency)
  currency!: AvailableCurrency;

  @Expose()
  @IsString()
  city!: string;
}
