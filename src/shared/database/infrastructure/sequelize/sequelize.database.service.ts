import { Sequelize } from 'sequelize-typescript';
import { ModelCtor } from 'sequelize-typescript/dist/model/model/model';
import { DatabaseServiceInterface } from '../../domain/databse.service.interface';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class SequelizeDatabaseService
  implements DatabaseServiceInterface, OnModuleInit
{
  public readonly sequelize: Sequelize;
  private models: ModelCtor[] = [];

  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'sequelize.sqlite',
      logging: false,
    });
  }

  addModel(models: ModelCtor): void {
    this.models.push(models);
  }

  async onModuleInit() {
    this.sequelize.addModels(this.models);
    await this.sequelize.sync({ alter: false });
  }
}
