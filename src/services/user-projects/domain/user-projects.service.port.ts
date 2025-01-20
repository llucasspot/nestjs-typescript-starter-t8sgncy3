import { CreateProjectDto } from '../../project/domain/dtos/create-project.dto';
import { UpdateProjectDto } from '../../project/domain/dtos/update-project.dto';
import { ProjectDto } from '../../project/domain/dtos/project.dto';

export type UserProjectsServiceFindAllBody = {
  userId: string;
};

export type UserProjectsServiceFindOneBody = {
  userId: string;
  projectId: string;
};

export abstract class UserProjectsServicePort {
  abstract findAll(
    findAllBody: UserProjectsServiceFindAllBody,
  ): Promise<ProjectDto[]>;

  abstract createOne(
    findAllBody: UserProjectsServiceFindAllBody,
    body: CreateProjectDto,
  ): Promise<ProjectDto>;

  abstract findOneById(
    findOneBody: UserProjectsServiceFindOneBody,
  ): Promise<ProjectDto>;

  abstract updateOne(
    findOneBody: UserProjectsServiceFindOneBody,
    body: UpdateProjectDto,
  ): Promise<ProjectDto>;

  abstract deleteOne(
    findOneBody: UserProjectsServiceFindOneBody,
  ): Promise<void>;
}
