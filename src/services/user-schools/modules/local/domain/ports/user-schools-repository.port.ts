import { CreateUserSchoolDto } from '../../../../domain/dtos/create-user-school.dto';
import { UserSchool } from '../../../../domain/dtos/user-school.entity';

export abstract class UserSchoolsRepositoryPort {
  abstract create(body: CreateUserSchoolDto): Promise<UserSchool>;

  abstract findById(id: string): Promise<UserSchool | null>;

  abstract findOne(body: Partial<UserSchool>): Promise<UserSchool | null>;

  abstract findAll(body: Partial<UserSchool>): Promise<UserSchool[]>;

  abstract update(id: string, school: Partial<UserSchool>): Promise<UserSchool>;

  abstract delete(id: string): Promise<void>;
}
