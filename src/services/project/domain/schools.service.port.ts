import { CreateSchoolBody } from '../../schools/domain/create-school.body';
import { GetSchoolBody } from '../../schools/domain/get-school.body';
import { SchoolDto } from '../../schools/domain/school.dto';
import { UpdateSchoolBody } from '../../schools/domain/update-school.body';

export abstract class SchoolsServicePort {
  abstract findAll(body?: GetSchoolBody): Promise<SchoolDto[]>;

  abstract createOne(body: CreateSchoolBody): Promise<SchoolDto>;

  abstract findOneById(id: string): Promise<SchoolDto>;

  abstract updateOne(id: string, body: UpdateSchoolBody): Promise<SchoolDto>;

  abstract deleteOne(id: string): Promise<void>;
}
