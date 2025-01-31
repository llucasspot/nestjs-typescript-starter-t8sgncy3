import { Module } from '@nestjs/common';
import { KlassesServicePort } from '../../../domain/klasses.service.port';
import { KlassesServiceLocalAdapter } from './adapters/klasses.service.local-adapter';
import { KlassesDatabaseModule } from './database/klasses.database.module';

@Module({
  imports: [KlassesDatabaseModule],
  providers: [
    {
      provide: KlassesServicePort,
      useClass: KlassesServiceLocalAdapter,
    },
  ],
  exports: [KlassesServicePort],
})
export class KlassesModuleLocal {}
