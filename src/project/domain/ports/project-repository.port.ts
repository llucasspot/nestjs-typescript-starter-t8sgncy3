import { Project } from '../entities/project.entity';

export abstract class ProjectRepositoryPort {
  abstract create(project: Project): Promise<Project>;
  abstract findById(id: string): Promise<Project | null>;
  abstract findByUserId(userId: string): Promise<Project[]>;
  abstract update(id: string, project: Partial<Project>): Promise<Project>;
  abstract delete(id: string): Promise<void>;
}
