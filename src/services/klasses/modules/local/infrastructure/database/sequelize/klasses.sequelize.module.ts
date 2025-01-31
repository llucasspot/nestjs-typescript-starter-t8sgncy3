import { Module } from '@nestjs/common';
import { KlassesRepositoryPort } from '../../../domain/ports/klasses-repository.port';
import { KlassesRepositorySequelizeAdapter } from './adapters/klasses.repository.sequelize-adapter';

@Module({
  providers: [
    {
      provide: KlassesRepositoryPort,
      useClass: KlassesRepositorySequelizeAdapter,
    },
  ],
  exports: [KlassesRepositoryPort],
})
export class KlassesSequelizeModule {}
