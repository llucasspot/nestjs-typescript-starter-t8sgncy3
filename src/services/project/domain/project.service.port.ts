import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectDto } from './dtos/project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

export abstract class ProjectServicePort {
  abstract findAll(projectIds?: string[]): Promise<ProjectDto[]>;

  abstract createOne(body: CreateProjectDto): Promise<ProjectDto>;

  abstract findOneById(projectId: string): Promise<ProjectDto>;

  abstract updateOne(
    projectId: string,
    body: UpdateProjectDto,
  ): Promise<ProjectDto>;

  abstract deleteOne(projectId: string): Promise<void>;
}
