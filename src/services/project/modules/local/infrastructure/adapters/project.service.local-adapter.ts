import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProjectDto,
  UpdateProjectDto,
} from '../../../../domain/dtos/project.dto';
import { ProjectServicePort } from '../../../../domain/project.service.port';
import { Project } from '../../../../domain/dtos/project.entity';
import { ProjectRepositoryPort } from '../../domain/ports/project-repository.port';

@Injectable()
export class ProjectServiceLocalAdapter implements ProjectServicePort {
  constructor(private readonly projectRepository: ProjectRepositoryPort) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async createOne(body: CreateProjectDto): Promise<Project> {
    return this.projectRepository.create(body);
  }

  async findOneById(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async updateOne(id: string, dto: UpdateProjectDto): Promise<Project> {
    await this.findOneById(id);
    return this.projectRepository.update(id, dto);
  }

  async deleteOne(id: string): Promise<void> {
    await this.findOneById(id);
    await this.projectRepository.delete(id);
  }
}
