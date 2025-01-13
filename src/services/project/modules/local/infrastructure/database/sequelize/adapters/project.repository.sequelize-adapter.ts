import { Injectable } from '@nestjs/common';
import { SequelizeDatabaseService } from '../../../../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import { CreateProjectDto } from '../../../../../../domain/dtos/project.dto';
import { Project as ProjectEntity } from '../../../../domain/entities/project.entity';
import { ProjectRepositoryPort } from '../../../../domain/ports/project-repository.port';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectRepositorySequelizeAdapter
  implements ProjectRepositoryPort
{
  constructor(sequelizeDatabaseService: SequelizeDatabaseService) {
    sequelizeDatabaseService.sequelize.addModels([Project]);
  }

  async create(body: CreateProjectDto): Promise<ProjectEntity> {
    const project = await Project.create({
      name: body.name,
      description: body.description,
    });

    return this.mapToEntity(project);
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    const project = await Project.findByPk(id);
    return project ? this.mapToEntity(project) : null;
  }

  async findAll(): Promise<ProjectEntity[]> {
    const projects = await Project.findAll();
    return projects.map(this.mapToEntity);
  }

  async update(
    id: string,
    projectEntity: Partial<ProjectEntity>,
  ): Promise<ProjectEntity> {
    const project = await Project.findByPk(id);
    if (!project) throw new Error('Project not found');

    await project.update(projectEntity);
    return this.mapToEntity(project);
  }

  async delete(id: string): Promise<void> {
    await Project.destroy({ where: { id } });
  }

  private mapToEntity(model: Project): ProjectEntity {
    return new ProjectEntity(
      model.id,
      model.name,
      model.description,
      model.createdAt,
      model.updatedAt,
    );
  }
}
