import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Getter } from '../../core/getter';
import { LoggerI } from '../logger.interface';
import {
  AxiosAbstractOptions,
  AxiosInstanceBuilder,
} from './axios-instance.builder';
import { logDataRequestMiddleware } from './middlewares/log-data-request-middleware';
import { logDataResponseMiddleware } from './middlewares/log-data-response-middleware';
import { setAuthorizationHeaderRequestMiddleware } from './middlewares/set-authorization-header-request.middleware';
import { setRequestIdRequestMiddleware } from './middlewares/set-request-id-reques.middleware';

export class HttpAxiosClient {
  private readonly client: AxiosInstance;

  constructor(
    protected readonly logger: LoggerI,
    options?: AxiosAbstractOptions,
    private authorizationGetter?: Getter<
      | `Bearer ${string}`
      | `Basic ${string}`
      | Promise<`Bearer ${string}`>
      | Promise<`Basic ${string}`>
    >,
  ) {
    this.client = new AxiosInstanceBuilder()
      .addRequestMiddleware(setRequestIdRequestMiddleware)
      .addRequestMiddleware(logDataRequestMiddleware(this.logger))
      .addRequestMiddleware(
        setAuthorizationHeaderRequestMiddleware(this.authorizationGetter),
      )
      .addResponseMiddleware(logDataResponseMiddleware(this.logger))
      .build(options);
  }

  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.get<T, R, D>(url, config);
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.delete<T, R, D>(url, config);
  }

  head<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.head<T, R, D>(url, config);
  }

  options<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.options<T, R, D>(url, config);
  }

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.post<T, R, D>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.put<T, R, D>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.patch<T, R, D>(url, data, config);
  }

  postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.postForm<T, R, D>(url, data, config);
  }

  putForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.putForm<T, R, D>(url, data, config);
  }

  patchForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.patchForm<T, R, D>(url, data, config);
  }
}
