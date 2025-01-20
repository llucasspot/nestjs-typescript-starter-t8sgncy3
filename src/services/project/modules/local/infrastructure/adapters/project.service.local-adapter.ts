import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateProjectDto } from '../../../../domain/dtos/create-project.dto';
import { ProjectDto } from '../../../../domain/dtos/project.dto';
import { UpdateProjectDto } from '../../../../domain/dtos/update-project.dto';
import { ProjectServicePort } from '../../../../domain/project.service.port';
import { ProjectRepositoryPort } from '../../domain/ports/project-repository.port';
import { ProjectEmitterPort } from '../../domain/ports/project.emitter.port';
import { ProjectEntity } from '../../domain/project.entity';

@Injectable()
export class ProjectServiceLocalAdapter implements ProjectServicePort {
  constructor(
    private readonly projectRepository: ProjectRepositoryPort,
    private readonly projectEmitterPort: ProjectEmitterPort,
  ) {}

  async findAll(projectIds?: string[]): Promise<ProjectDto[]> {
    const projectEntities = await this.projectRepository.findAll(projectIds);
    console.log(projectEntities);
    return projectEntities.map(this.mapToDomain);
  }

  async createOne(body: CreateProjectDto): Promise<ProjectDto> {
    const projectEntity = await this.projectRepository.create(body);
    return this.mapToDomain(projectEntity);
  }

  async findOneById(id: string): Promise<ProjectDto> {
    const projectEntity = await this.projectRepository.findById(id);
    if (!projectEntity) {
      throw new NotFoundException('Project not found');
    }
    return this.mapToDomain(projectEntity);
  }

  async updateOne(id: string, body: UpdateProjectDto): Promise<ProjectDto> {
    await this.findOneById(id);
    const projectEntity = await this.projectRepository.update(id, body);
    return this.mapToDomain(projectEntity);
  }

  async deleteOne(projectId: string): Promise<void> {
    await this.findOneById(projectId);
    await this.projectRepository.delete(projectId);
    await this.projectEmitterPort.emit('project deleted', { projectId });
  }

  private mapToDomain(projectEntity: ProjectEntity): ProjectDto {
    return plainToInstance(ProjectDto, projectEntity);
  }
}
