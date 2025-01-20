import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SequelizeDatabaseService } from '../../../../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import { CreateSchoolEntityBody } from '../../../../domain/create-school-entity.body';
import { SchoolRepositoryPort } from '../../../../domain/ports/school-repository.port';
import { SchoolEntity } from '../../../../domain/school.entity';
import { SchoolSequelizeModel } from '../models/school.sequelize.model';

@Injectable()
export class SchoolRepositorySequelizeAdapter implements SchoolRepositoryPort {
  private readonly model = SchoolSequelizeModel;

  constructor(sequelizeDatabaseService: SequelizeDatabaseService) {
    sequelizeDatabaseService.addModel(this.model);
  }

  async create(body: CreateSchoolEntityBody): Promise<SchoolEntity> {
    const school = await this.model.create(body);

    return this.mapToEntity(school);
  }

  async findById(schoolId: string): Promise<SchoolEntity | null> {
    const school = await this.model.findByPk(schoolId);
    return school ? this.mapToEntity(school) : null;
  }

  async findAll(schoolIdq?: string[]): Promise<SchoolEntity[]> {
    const schools = await this.model.findAll({ where: { id: schoolIdq } });
    return schools.map(this.mapToEntity);
  }

  async update(
    schoolId: string,
    body: Partial<SchoolEntity>,
  ): Promise<SchoolEntity> {
    const school = await this.model.findByPk(schoolId);
    if (!school) throw new NotFoundException('School not found');

    await school.update(body);
    return this.mapToEntity(school);
  }

  async delete(schoolId: string): Promise<void> {
    await this.model.destroy({ where: { id: schoolId } });
  }

  private mapToEntity(model: SchoolSequelizeModel): SchoolEntity {
    return plainToInstance(SchoolEntity, model.toJSON());
  }
}
