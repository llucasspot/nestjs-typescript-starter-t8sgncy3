import { CreateProjectDto } from '../../../../domain/dtos/project.dto';
import { Project } from '../entities/project.entity';

export abstract class ProjectRepositoryPort {
  abstract create(body: CreateProjectDto): Promise<Project>;
  abstract findById(id: string): Promise<Project | null>;
  abstract findAll(): Promise<Project[]>;
  abstract update(id: string, project: Partial<Project>): Promise<Project>;
  abstract delete(id: string): Promise<void>;
}
