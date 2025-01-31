import { Injectable, NotFoundException } from '@nestjs/common';
import { SequelizeDatabaseService } from '../../../../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import { CreateUserSchoolDto } from '../../../../../../domain/dtos/create-user-school.dto';
import { UserSchool } from '../../../../../../domain/dtos/user-school.entity';
import { UserSchoolsRepositoryPort } from '../../../../domain/ports/user-schools-repository.port';
import { UserSchoolSequelizeModel } from '../models/user-school.sequelize.model';

@Injectable()
export class UserSchoolsRepositorySequelizeAdapter
  implements UserSchoolsRepositoryPort
{
  private readonly model = UserSchoolSequelizeModel;

  constructor(sequelizeDatabaseService: SequelizeDatabaseService) {
    sequelizeDatabaseService.addModel(this.model);
  }

  async create({ userId, schoolId }: CreateUserSchoolDto): Promise<UserSchool> {
    const model = await this.model.create({
      userId,
      schoolId,
    });
    return this.mapToEntity(model);
  }

  async findOne(body: Partial<UserSchool>): Promise<UserSchool | null> {
    const model = await this.model.findOne({
      where: body,
    });
    return this.mapToEntity(model);
  }

  async findById(id: string): Promise<UserSchool | null> {
    const model = await this.model.findByPk(id);
    return this.mapToEntity(model);
  }

  async findAll(body: Partial<UserSchool>): Promise<UserSchool[]> {
    const models = await this.model.findAll({
      where: body,
    });
    return models.map((model) => this.mapToEntity(model));
  }

  async update(id: string, body: Partial<UserSchool>): Promise<UserSchool> {
    const model = await this.model.findByPk(id);
    if (!model) {
      throw new NotFoundException('School not found');
    }
    await model.update(body);
    return this.mapToEntity(model);
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  private mapToEntity(model: null): null;
  private mapToEntity(model: UserSchool): UserSchool;
  private mapToEntity(model: UserSchool | null): UserSchool | null;
  private mapToEntity(model: UserSchool | null): UserSchool | null {
    if (!model) {
      return null;
    }
    return new UserSchool(model.id, model.schoolId, model.userId);
  }
}
