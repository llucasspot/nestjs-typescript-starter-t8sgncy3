import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepositoryPort } from '../../domain/ports/project-repository.port';
import { Project } from '../../domain/entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepositoryPort) {}

  async create(body: CreateProjectDto): Promise<Project> {
    return this.projectRepository.create(body);
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
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
