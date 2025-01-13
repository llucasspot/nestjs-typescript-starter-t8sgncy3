import { Injectable } from '@nestjs/common';
import { Cache, createCache } from 'cache-manager';
import { CacheOptions, CacheServicePort } from '../domain/cache.service.port';

@Injectable()
export class CacheServiceCacheManagerAdapter implements CacheServicePort {
  private readonly cache: Cache = createCache();

  constructor() {
    this.cache = createCache();
  }

  async set<TResult>(
    cacheKey: string,
    value: TResult,
    options?: CacheOptions,
  ): Promise<void> {
    await this.cache.set(cacheKey, value, options?.ttl);
  }

  async remove(cacheKey: string): Promise<void> {
    await this.cache.del(cacheKey);
  }

  async get<TResult>(cacheKey: string): Promise<TResult | null> {
    return this.cache.get<TResult>(cacheKey);
  }
}
