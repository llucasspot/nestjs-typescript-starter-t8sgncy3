import { CreateProjectEntityBody } from '../create-project-entity.body';
import { ProjectEntity } from '../project.entity';

export abstract class ProjectRepositoryPort {
  abstract create(body: CreateProjectEntityBody): Promise<ProjectEntity>;

  abstract findById(projectId: string): Promise<ProjectEntity | null>;

  abstract findAll(projectIds?: string[]): Promise<ProjectEntity[]>;

  abstract update(
    projectId: string,
    body: Partial<ProjectEntity>,
  ): Promise<ProjectEntity>;

  abstract delete(projectId: string): Promise<void>;
}
