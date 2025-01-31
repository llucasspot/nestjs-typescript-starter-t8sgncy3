import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateProjectDto } from '../../../../domain/dtos/create-project.dto';
import { GetProjectBody } from '../../../../domain/dtos/get-project.body';
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

  async findAll(body?: GetProjectBody): Promise<ProjectDto[]> {
    const entities = await this.projectRepository.findAll(body);
    return entities.map(this.mapToDomain);
  }

  async createOne(body: CreateProjectDto): Promise<ProjectDto> {
    const entity = await this.projectRepository.create(body);
    return this.mapToDomain(entity);
  }

  async findOneById(id: string): Promise<ProjectDto> {
    const entity = await this.projectRepository.findById(id);
    if (!entity) {
      throw new NotFoundException('Project not found');
    }
    return this.mapToDomain(entity);
  }

  async updateOne(id: string, body: UpdateProjectDto): Promise<ProjectDto> {
    await this.findOneById(id);
    const entity = await this.projectRepository.update(id, body);
    return this.mapToDomain(entity);
  }

  async deleteOne(id: string): Promise<void> {
    await this.findOneById(id);
    await this.projectRepository.delete(id);
    await this.projectEmitterPort.emit('project deleted', { id });
  }

  private mapToDomain(entity: ProjectEntity): ProjectDto {
    return plainToInstance(ProjectDto, entity);
  }
}
