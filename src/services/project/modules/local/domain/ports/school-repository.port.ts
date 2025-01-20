import { CreateSchoolEntityBody } from '../create-school-entity.body';
import { SchoolEntity } from '../school.entity';

export abstract class SchoolRepositoryPort {
  abstract create(body: CreateSchoolEntityBody): Promise<SchoolEntity>;

  abstract findById(schoolId: string): Promise<SchoolEntity | null>;

  abstract findAll(schoolIds?: string[]): Promise<SchoolEntity[]>;

  abstract update(
    schoolId: string,
    body: Partial<SchoolEntity>,
  ): Promise<SchoolEntity>;

  abstract delete(schoolId: string): Promise<void>;
}
