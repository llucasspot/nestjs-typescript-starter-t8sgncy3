import { Project } from '../modules/local/domain/entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from './dtos/project.dto';

export abstract class ProjectServicePort {
  abstract findAll(): Promise<Project[]>;

  abstract createOne(body: CreateProjectDto): Promise<Project>;

  abstract findOneById(id: string): Promise<Project>;

  abstract updateOne(id: string, dto: UpdateProjectDto): Promise<Project>;

  abstract deleteOne(id: string): Promise<void>;
}
