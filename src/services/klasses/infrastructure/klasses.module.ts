import { Module } from '@nestjs/common';
import { KlassesModuleLocal } from '../modules/local/infrastructure/klasses.module.local';
import { KlassesController } from './controllers/klasses.controller';

@Module({
  imports: [KlassesModuleLocal],
  controllers: [KlassesController],
})
export class KlassesModule {}
