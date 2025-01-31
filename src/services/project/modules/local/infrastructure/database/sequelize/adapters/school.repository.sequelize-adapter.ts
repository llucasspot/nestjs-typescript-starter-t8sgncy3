import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SequelizeDatabaseService } from '../../../../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import {
  CreateSchoolEntityBody,
  GetSchoolEntityBody,
  SchoolRepositoryPort,
  UpdateSchoolEntityBody,
} from '../../../../domain/ports/school-repository.port';
import { SchoolEntity } from '../../../../domain/school.entity';
import { SchoolSequelizeModel } from '../models/school.sequelize.model';

@Injectable()
export class SchoolRepositorySequelizeAdapter implements SchoolRepositoryPort {
  private readonly model = SchoolSequelizeModel;

  constructor(sequelizeDatabaseService: SequelizeDatabaseService) {
    sequelizeDatabaseService.addModel(this.model);
  }

  async create(body: CreateSchoolEntityBody): Promise<SchoolEntity> {
    const model = await this.model.create(body);
    return this.mapToEntity(model);
  }

  async findById(id: string): Promise<SchoolEntity | null> {
    const model = await this.model.findByPk(id);
    return model ? this.mapToEntity(model) : null;
  }

  async findAll(body?: GetSchoolEntityBody): Promise<SchoolEntity[]> {
    const models = await this.model.findAll({ where: body });
    return models.map(this.mapToEntity);
  }

  async update(
    id: string,
    body: UpdateSchoolEntityBody,
  ): Promise<SchoolEntity> {
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

  private mapToEntity(model: SchoolSequelizeModel): SchoolEntity {
    return plainToInstance(SchoolEntity, model.toJSON());
  }
}
