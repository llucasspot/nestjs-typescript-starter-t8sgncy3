import { AvailableCurrency, SchoolEntity } from '../school.entity';

export type CreateSchoolEntityBody = Omit<SchoolEntity, 'id'>;
export type UpdateSchoolEntityBody = Partial<CreateSchoolEntityBody>;
export type GetSchoolEntityBody = Partial<{
  id: string | string[];
  name: string | string[];
  currency: AvailableCurrency | AvailableCurrency[];
  city: string | string[];
}>;

export abstract class SchoolRepositoryPort {
  abstract create(body: CreateSchoolEntityBody): Promise<SchoolEntity>;

  abstract findById(id: string): Promise<SchoolEntity | null>;

  abstract findAll(body?: GetSchoolEntityBody): Promise<SchoolEntity[]>;

  abstract update(
    id: string,
    body: UpdateSchoolEntityBody,
  ): Promise<SchoolEntity>;

  abstract delete(id: string): Promise<void>;
}
