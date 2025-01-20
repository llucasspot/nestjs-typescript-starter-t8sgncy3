import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SequelizeDatabaseService } from '../../../../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import { CreateProjectEntityBody } from '../../../../domain/create-project-entity.body';
import { ProjectRepositoryPort } from '../../../../domain/ports/project-repository.port';
import { ProjectEntity } from '../../../../domain/project.entity';
import { ProjectSequelizeModel } from '../models/project.sequelize.model';
import { SchoolSequelizeModel } from '../models/school.sequelize.model';

@Injectable()
export class ProjectRepositorySequelizeAdapter
  implements ProjectRepositoryPort
{
  private readonly model = ProjectSequelizeModel;

  constructor(sequelizeDatabaseService: SequelizeDatabaseService) {
    sequelizeDatabaseService.addModel(this.model);
  }

  async create(body: CreateProjectEntityBody): Promise<ProjectEntity> {
    const project = await this.model.create(body, {
      include: [SchoolSequelizeModel],
    });

    return this.mapToEntity(project);
  }

  async findById(projectId: string): Promise<ProjectEntity | null> {
    const project = await this.model.findByPk(projectId, {
      include: [SchoolSequelizeModel],
    });
    return project ? this.mapToEntity(project) : null;
  }

  async findAll(projectIds?: string[]): Promise<ProjectEntity[]> {
    const projects = await this.model.findAll({
      where: { id: projectIds },
      include: [
        {
          model: SchoolSequelizeModel,
        },
      ],
    });
    return projects.map(this.mapToEntity);
  }

  async update(
    projectId: string,
    body: Partial<ProjectEntity>,
  ): Promise<ProjectEntity> {
    const project = await this.model.findByPk(projectId, {
      include: [SchoolSequelizeModel],
    });
    if (!project) throw new NotFoundException('Project not found');

    await project.update(body);
    return this.mapToEntity(project);
  }

  async delete(projectId: string): Promise<void> {
    await this.model.destroy({ where: { id: projectId } });
  }

  private mapToEntity(model: ProjectSequelizeModel): ProjectEntity {
    return plainToInstance(ProjectEntity, model.toJSON());
  }
}
