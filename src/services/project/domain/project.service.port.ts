import { CreateProjectDto } from './dtos/create-project.dto';
import { GetProjectBody } from './dtos/get-project.body';
import { ProjectDto } from './dtos/project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

export abstract class ProjectServicePort {
  abstract findAll(body?: GetProjectBody): Promise<ProjectDto[]>;

  abstract createOne(body: CreateProjectDto): Promise<ProjectDto>;

  abstract findOneById(id: string): Promise<ProjectDto>;

  abstract updateOne(id: string, body: UpdateProjectDto): Promise<ProjectDto>;

  abstract deleteOne(id: string): Promise<void>;
}
