import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProjectDto,
  UpdateProjectDto,
} from '../../../../../project/domain/dtos/project.dto';
import { Project } from '../../../../../project/domain/dtos/project.entity';
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
  }: UserProjectsServiceFindAllBody): Promise<Project[]> {
    // TODO use it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userProjects = await this.userProjectsRepository.findAll({
      userId,
    });
    return this.projectServicePort.findAll();
  }

  async createOne(
    { userId }: UserProjectsServiceFindAllBody,
    body: CreateProjectDto,
  ): Promise<Project> {
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
  }: UserProjectsServiceFindOneBody): Promise<Project> {
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
  ): Promise<Project> {
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
