import { Injectable, NotFoundException } from '@nestjs/common';
import { SequelizeDatabaseService } from '../../../../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import { CreateUserProjectDto } from '../../../../../../domain/dtos/create-user-project.dto';
import { UserProject } from '../../../../../../domain/dtos/user-project.entity';
import { UserProjectsRepositoryPort } from '../../../../domain/ports/user-projects-repository.port';
import { UserProjectSequelizeModel } from '../models/user-project.sequelize.model';

@Injectable()
export class UserProjectsRepositorySequelizeAdapter
  implements UserProjectsRepositoryPort
{
  private readonly model = UserProjectSequelizeModel;

  constructor(sequelizeDatabaseService: SequelizeDatabaseService) {
    sequelizeDatabaseService.addModel(this.model);
  }

  async create({
    userId,
    projectId,
  }: CreateUserProjectDto): Promise<UserProject> {
    const model = await this.model.create({
      userId,
      projectId,
    });
    return this.mapToEntity(model);
  }

  async findOne(body: Partial<UserProject>): Promise<UserProject | null> {
    const model = await this.model.findOne({
      where: body,
    });
    return this.mapToEntity(model);
  }

  async findById(id: string): Promise<UserProject | null> {
    const model = await this.model.findByPk(id);
    return this.mapToEntity(model);
  }

  async findAll(body: Partial<UserProject>): Promise<UserProject[]> {
    const models = await this.model.findAll({
      where: body,
    });
    return models.map((model) => this.mapToEntity(model));
  }

  async update(
    id: string,
    projectEntity: Partial<UserProject>,
  ): Promise<UserProject> {
    const model = await this.model.findByPk(id);
    if (!model) {
      throw new NotFoundException('Project not found');
    }
    await model.update(projectEntity);
    return this.mapToEntity(model);
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  private mapToEntity(model: null): null;
  private mapToEntity(model: UserProject): UserProject;
  private mapToEntity(model: UserProject | null): UserProject | null;
  private mapToEntity(model: UserProject | null): UserProject | null {
    if (!model) {
      return null;
    }
    return new UserProject(model.id, model.projectId, model.userId);
  }
}
