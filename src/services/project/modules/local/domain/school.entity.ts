import { Expose } from 'class-transformer';

export enum AvailableCurrency {
  EUR = 'EUR',
}

export class SchoolEntity {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
  @Expose()
  currency!: AvailableCurrency;
  @Expose()
  city!: string;
}
