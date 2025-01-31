import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../../../../../project/domain/dtos/create-project.dto';
import { UpdateProjectDto } from '../../../../../project/domain/dtos/update-project.dto';
import { ProjectDto } from '../../../../../project/domain/dtos/project.dto';
import { ProjectServicePort } from '../../../../../project/domain/project.service.port';
import {
  UserProjectsServiceFindAllBody,
  UserProjectsServiceFindOneBody,
  UserProjectsServicePort,
} from '../../../../domain/user-projects.service.port';
import { UserProjectsRepositoryPort } from '../../domain/ports/user-projects-repository.port';

@Injectable()
export class UserProjectsServiceLocalAdapter
  implements UserProjectsServicePort
{
  constructor(
    private readonly userProjectsRepository: UserProjectsRepositoryPort,
    private readonly projectServicePort: ProjectServicePort,
  ) {}

  async findAll({
    userId,
  }: UserProjectsServiceFindAllBody): Promise<ProjectDto[]> {
    const userProjects = await this.userProjectsRepository.findAll({
      userId,
    });
    return this.projectServicePort.findAll({
      id: userProjects.map(({ projectId }) => projectId),
    });
  }

  async createOne(
    { userId }: UserProjectsServiceFindAllBody,
    body: CreateProjectDto,
  ): Promise<ProjectDto> {
    const project = await this.projectServicePort.createOne(body);
    await this.userProjectsRepository.create({
      userId,
      projectId: project.id,
    });
    return project;
  }

  async findOneById({
    userId,
    projectId,
  }: UserProjectsServiceFindOneBody): Promise<ProjectDto> {
    const userProject = await this.userProjectsRepository.findOne({
      userId,
      projectId,
    });
    if (!userProject) {
      throw new NotFoundException('User project not found');
    }
    return this.projectServicePort.findOneById(projectId);
  }

  async updateOne(
    { userId, projectId }: UserProjectsServiceFindOneBody,
    body: UpdateProjectDto,
  ): Promise<ProjectDto> {
    const userProject = await this.userProjectsRepository.findOne({
      userId,
      projectId,
    });
    if (!userProject) {
      throw new NotFoundException('User project not found');
    }
    return this.projectServicePort.updateOne(projectId, body);
  }

  async deleteOne({
    userId,
    projectId,
  }: UserProjectsServiceFindOneBody): Promise<void> {
    const userProject = await this.userProjectsRepository.findOne({
      userId,
      projectId,
    });
    if (!userProject) {
      throw new NotFoundException('User project not found');
    }
    return this.projectServicePort.deleteOne(projectId);
  }
}
