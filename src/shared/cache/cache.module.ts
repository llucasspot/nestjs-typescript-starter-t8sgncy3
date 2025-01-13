import { Module } from '@nestjs/common';
import { CacheService } from './domain/cache.service';
import { CacheServicePort } from './domain/cache.service.port';
import { CacheServiceCacheManagerAdapter } from './infrastructure/cache.service.cache-manager-adapter';

@Module({
  imports: [],
  providers: [
    CacheService,
    CacheServiceCacheManagerAdapter,
    {
      provide: CacheServicePort,
      useExisting: CacheServiceCacheManagerAdapter,
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
