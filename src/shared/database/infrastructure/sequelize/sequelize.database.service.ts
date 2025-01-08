import { Sequelize } from 'sequelize-typescript';
import { DatabaseServiceInterface } from '../../domain/databse.service.interface';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class SequelizeDatabaseService implements DatabaseServiceInterface, OnModuleInit {
  public readonly sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'sequelize.sqlite',
      logging: false,
    });
  }

  async onModuleInit() {
    await this.sequelize.sync();
  }
}
