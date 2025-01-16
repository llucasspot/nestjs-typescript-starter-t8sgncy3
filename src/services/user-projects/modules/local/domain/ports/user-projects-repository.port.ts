import { CreateUserProjectDto } from '../../../../domain/dtos/create-user-project.dto';
import { UserProject } from '../../../../domain/dtos/user-project.entity';

export abstract class UserProjectsRepositoryPort {
  abstract create(body: CreateUserProjectDto): Promise<UserProject>;

  abstract findById(id: string): Promise<UserProject | null>;

  abstract findOne(body: Partial<UserProject>): Promise<UserProject | null>;

  abstract findAll(body: Partial<UserProject>): Promise<UserProject[]>;

  abstract update(
    id: string,
    project: Partial<UserProject>,
  ): Promise<UserProject>;

  abstract delete(id: string): Promise<void>;
}
