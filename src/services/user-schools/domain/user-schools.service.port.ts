import { CreateSchoolDto } from '../../schools/domain/create-school.dto';
import { SchoolDto } from '../../schools/domain/school.dto';
import { UpdateSchoolDto } from '../../schools/domain/update-school.dto';

export type UserSchoolsServiceFindAllBody = {
  userId: string;
};

export type UserSchoolsServiceFindOneBody = {
  userId: string;
  schoolId: string;
};

export abstract class UserSchoolsServicePort {
  abstract findAll(
    findAllBody: UserSchoolsServiceFindAllBody,
  ): Promise<SchoolDto[]>;

  abstract createOne(
    findAllBody: UserSchoolsServiceFindAllBody,
    body: CreateSchoolDto,
  ): Promise<SchoolDto>;

  abstract findOneById(
    findOneBody: UserSchoolsServiceFindOneBody,
  ): Promise<SchoolDto>;

  abstract updateOne(
    findOneBody: UserSchoolsServiceFindOneBody,
    body: UpdateSchoolDto,
  ): Promise<SchoolDto>;

  abstract deleteOne(findOneBody: UserSchoolsServiceFindOneBody): Promise<void>;
}
