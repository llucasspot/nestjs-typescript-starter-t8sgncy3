import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepositoryPort } from '../../domain/ports/project-repository.port';
import { Project } from '../../domain/entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepositoryPort) {}

  async create(dto: CreateProjectDto, userId: string): Promise<Project> {
    const project = Project.create(dto.name, dto.description);
    return this.projectRepository.create(project);
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async findByUserId(userId: string): Promise<Project[]> {
    return this.projectRepository.findByUserId(userId);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    await this.findById(id);
    return this.projectRepository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.projectRepository.delete(id);
  }
}
