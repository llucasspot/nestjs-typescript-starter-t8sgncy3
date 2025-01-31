import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SequelizeDatabaseService } from '../../../../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import { KlassEntity } from '../../../../domain/klass.entity';
import {
  CreateKlassEntityBody,
  GetKlassEntityBody,
  KlassesRepositoryPort,
  UpdateKlassEntityBody,
} from '../../../../domain/ports/klasses-repository.port';
import { KlassSequelizeModel } from '../models/klass.sequelize.model';

@Injectable()
export class KlassesRepositorySequelizeAdapter
  implements KlassesRepositoryPort
{
  private readonly model = KlassSequelizeModel;

  constructor(sequelizeDatabaseService: SequelizeDatabaseService) {
    sequelizeDatabaseService.addModel(this.model);
  }

  async create(body: CreateKlassEntityBody): Promise<KlassEntity> {
    const model = await this.model.create(body);
    return this.mapToEntity(model);
  }

  async findById(id: string): Promise<KlassEntity | null> {
    const model = await this.model.findByPk(id);
    return model ? this.mapToEntity(model) : null;
  }

  async findAll(findBody?: GetKlassEntityBody): Promise<KlassEntity[]> {
    const models = await this.model.findAll({
      where: findBody,
    });
    return models.map(this.mapToEntity);
  }

  async update(id: string, body: UpdateKlassEntityBody): Promise<KlassEntity> {
    const model = await this.model.findByPk(id);
    if (!model) throw new NotFoundException('Klass not found');

    await model.update(body);
    return this.mapToEntity(model);
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id: id } });
  }

  private mapToEntity(model: KlassSequelizeModel): KlassEntity {
    return plainToInstance(KlassEntity, model.toJSON());
  }
}
