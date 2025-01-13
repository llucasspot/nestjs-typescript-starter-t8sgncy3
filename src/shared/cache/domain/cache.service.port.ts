export type CacheOptions = {
  ttl?: number;
};

export abstract class CacheServicePort {
  abstract get<TResult>(cacheKey: string): Promise<TResult | null>;

  abstract set<TResult>(
    cacheKey: string,
    value: TResult,
    options?: CacheOptions,
  ): Promise<void>;

  abstract remove(cacheKey: string): Promise<void>;
}
