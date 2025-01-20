import { CreateSchoolDto } from '../../schools/domain/create-school.dto';
import { SchoolDto } from '../../schools/domain/school.dto';
import { UpdateSchoolDto } from '../../schools/domain/update-school.dto';

export abstract class SchoolsServicePort {
  abstract findAll(projectIds?: string[]): Promise<SchoolDto[]>;

  abstract createOne(body: CreateSchoolDto): Promise<SchoolDto>;

  abstract findOneById(schoolId: string): Promise<SchoolDto>;

  abstract updateOne(
    schoolId: string,
    body: UpdateSchoolDto,
  ): Promise<SchoolDto>;

  abstract deleteOne(projectId: string): Promise<void>;
}
