import { Getter } from '../../../core/getter';
import { RequestMiddleware } from '../axios-instance.builder';

export const setAuthorizationHeaderRequestMiddleware = (
  authorizationGetter?: Getter<
    | `Bearer ${string}`
    | `Basic ${string}`
    | Promise<`Bearer ${string}`>
    | Promise<`Basic ${string}`>
  >,
): RequestMiddleware => [
  async (config) => {
    if (authorizationGetter) {
      config.headers['Authorization'] = await authorizationGetter.get();
    }
    return config;
  },
];
