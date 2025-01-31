import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SequelizeDatabaseService } from '../../../../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import {
  CreateProjectEntityBody,
  GetProjectEntityBody,
  ProjectRepositoryPort,
} from '../../../../domain/ports/project-repository.port';
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
    const model = await this.model.create(body, {
      include: [SchoolSequelizeModel],
    });
    return this.mapToEntity(model);
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    const model = await this.model.findByPk(id, {
      include: [SchoolSequelizeModel],
    });
    return model ? this.mapToEntity(model) : null;
  }

  async findAll(body?: GetProjectEntityBody): Promise<ProjectEntity[]> {
    const models = await this.model.findAll({
      where: body,
      include: [
        {
          model: SchoolSequelizeModel,
        },
      ],
    });
    return models.map(this.mapToEntity);
  }

  async update(
    id: string,
    body: Partial<ProjectEntity>,
  ): Promise<ProjectEntity> {
    const model = await this.model.findByPk(id, {
      include: [SchoolSequelizeModel],
    });
    if (!model) {
      throw new NotFoundException('Project not found');
    }
    await model.update(body);
    return this.mapToEntity(model);
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  private mapToEntity(model: ProjectSequelizeModel): ProjectEntity {
    return plainToInstance(ProjectEntity, model.toJSON());
  }
}
