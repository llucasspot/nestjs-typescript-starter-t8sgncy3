import { InternalAxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { RequestMiddleware } from '../axios-instance.builder';

export const setRequestIdRequestMiddleware: RequestMiddleware = [
  async (config) => {
    setRequestIdOnConfig(config);
    return config;
  },
];

export const setRequestIdOnConfig = (
  config: InternalAxiosRequestConfig<any>,
) => {
  // @ts-expect-error axios requestId
  config['requestId'] = uuidv4();
};
