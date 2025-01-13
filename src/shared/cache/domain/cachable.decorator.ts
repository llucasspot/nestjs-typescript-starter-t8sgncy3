import { Logger } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheOptions } from './cache.service.port';

export function Cacheable(
  cacheKey: string,
  options?: CacheOptions,
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const cacheService: CacheService = this.cacheService;
      const logger: Logger = this.logger || new Logger(this.constructor.name);

      if (!cacheService) {
        logger.warn('no cacheService');
        return originalMethod.apply(this, args);
      }

      const cachedData = await cacheService.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await originalMethod.apply(this, args);
      await cacheService.set(cacheKey, result, options);
      return result;
    };

    return descriptor;
  };
}
