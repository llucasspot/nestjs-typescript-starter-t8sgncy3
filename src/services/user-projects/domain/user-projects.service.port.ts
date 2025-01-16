import {
  CreateProjectDto,
  UpdateProjectDto,
} from '../../project/domain/dtos/project.dto';
import { Project } from '../../project/domain/dtos/project.entity';

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
  ): Promise<Project[]>;

  abstract createOne(
    findAllBody: UserProjectsServiceFindAllBody,
    body: CreateProjectDto,
  ): Promise<Project>;

  abstract findOneById(
    findOneBody: UserProjectsServiceFindOneBody,
  ): Promise<Project>;

  abstract updateOne(
    findOneBody: UserProjectsServiceFindOneBody,
    body: UpdateProjectDto,
  ): Promise<Project>;

  abstract deleteOne(
    findOneBody: UserProjectsServiceFindOneBody,
  ): Promise<void>;
}
