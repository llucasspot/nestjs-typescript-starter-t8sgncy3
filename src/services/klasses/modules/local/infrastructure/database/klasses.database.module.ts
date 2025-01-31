import { Module } from '@nestjs/common';
import { KlassesSequelizeModule } from './sequelize/klasses.sequelize.module';

@Module({
  imports: [KlassesSequelizeModule],
  exports: [KlassesSequelizeModule],
})
export class KlassesDatabaseModule {}
