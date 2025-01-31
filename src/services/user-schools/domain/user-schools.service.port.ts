import { CreateSchoolBody } from '../../schools/domain/create-school.body';
import { SchoolDto } from '../../schools/domain/school.dto';
import { UpdateSchoolBody } from '../../schools/domain/update-school.body';

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
    body: CreateSchoolBody,
  ): Promise<SchoolDto>;

  abstract findOneById(
    findOneBody: UserSchoolsServiceFindOneBody,
  ): Promise<SchoolDto>;

  abstract updateOne(
    findOneBody: UserSchoolsServiceFindOneBody,
    body: UpdateSchoolBody,
  ): Promise<SchoolDto>;

  abstract deleteOne(findOneBody: UserSchoolsServiceFindOneBody): Promise<void>;
}
