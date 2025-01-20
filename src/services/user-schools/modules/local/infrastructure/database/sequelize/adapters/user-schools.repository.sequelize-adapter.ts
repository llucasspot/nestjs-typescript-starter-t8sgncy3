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
    const school = await this.model.create({
      userId,
      schoolId,
    });

    return this.mapToEntity(school);
  }

  async findOne(body: Partial<UserSchool>): Promise<UserSchool | null> {
    const school = await this.model.findOne({
      where: body,
    });
    return this.mapToEntity(school);
  }

  async findById(id: string): Promise<UserSchool | null> {
    const school = await this.model.findByPk(id);
    return this.mapToEntity(school);
  }

  async findAll(body: Partial<UserSchool>): Promise<UserSchool[]> {
    const schools = await this.model.findAll({
      where: body,
    });
    return schools.map((school) => this.mapToEntity(school));
  }

  async update(
    id: string,
    schoolEntity: Partial<UserSchool>,
  ): Promise<UserSchool> {
    const school = await this.model.findByPk(id);
    if (!school) throw new NotFoundException('School not found');

    await school.update(schoolEntity);
    return this.mapToEntity(school);
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
