import { Injectable, Logger } from '@nestjs/common';
import { CacheOptions, CacheServicePort } from './cache.service.port';

@Injectable()
export class CacheService implements CacheServicePort {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly cacheService: CacheServicePort) {}

  async set<TResult>(
    cacheKey: string,
    value: TResult,
    options?: CacheOptions,
  ): Promise<void> {
    try {
      return this.cacheService.set(cacheKey, value, options);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async remove(cacheKey: string): Promise<void> {
    try {
      return this.cacheService.remove(cacheKey);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async get<TResult>(cacheKey: string): Promise<TResult | null> {
    try {
      return this.cacheService.get(cacheKey);
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }
}
