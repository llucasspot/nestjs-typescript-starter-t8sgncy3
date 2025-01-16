import { Injectable, NotFoundException } from '@nestjs/common';
import { SequelizeDatabaseService } from '../../../../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import { CreateProjectDto } from '../../../../../../domain/dtos/project.dto';
import { Project as ProjectEntity } from '../../../../../../domain/dtos/project.entity';
import { ProjectRepositoryPort } from '../../../../domain/ports/project-repository.port';
import { ProjectSequelizeModel } from '../models/project.sequelize.model';

@Injectable()
export class ProjectRepositorySequelizeAdapter
  implements ProjectRepositoryPort
{
  private readonly model = ProjectSequelizeModel;

  constructor(sequelizeDatabaseService: SequelizeDatabaseService) {
    sequelizeDatabaseService.sequelize.addModels([this.model]);
  }

  async create(body: CreateProjectDto): Promise<ProjectEntity> {
    const project = await this.model.create({
      name: body.name,
      description: body.description,
    });

    return this.mapToEntity(project);
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    const project = await this.model.findByPk(id);
    return project ? this.mapToEntity(project) : null;
  }

  async findAll(): Promise<ProjectEntity[]> {
    const projects = await this.model.findAll();
    return projects.map(this.mapToEntity);
  }

  async update(
    id: string,
    projectEntity: Partial<ProjectEntity>,
  ): Promise<ProjectEntity> {
    const project = await this.model.findByPk(id);
    if (!project) throw new NotFoundException('Project not found');

    await project.update(projectEntity);
    return this.mapToEntity(project);
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  private mapToEntity(model: ProjectSequelizeModel): ProjectEntity {
    return new ProjectEntity(
      model.id,
      model.name,
      model.description,
      model.createdAt,
      model.updatedAt,
    );
  }
}
