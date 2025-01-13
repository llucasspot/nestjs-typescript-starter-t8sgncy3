import axios, { AxiosInstance } from 'axios';

export type RequestMiddleware = Parameters<
  AxiosInstance['interceptors']['request']['use']
>;
export type ResponseMiddleware = Parameters<
  AxiosInstance['interceptors']['response']['use']
>;

type UrlString = `http://${string}/` | `https://${string}/`;

export type AxiosAbstractOptions = {
  baseURL: UrlString;
  timeout?: number;
};

export class AxiosInstanceBuilder {
  private readonly requestMiddlewares: RequestMiddleware[] = [];
  private readonly responseMiddlewares: ResponseMiddleware[] = [];

  addRequestMiddleware(middleware: RequestMiddleware) {
    this.requestMiddlewares.push(middleware);
    return this;
  }

  addResponseMiddleware(middleware: ResponseMiddleware) {
    this.responseMiddlewares.push(middleware);
    return this;
  }

  build(options?: AxiosAbstractOptions) {
    const { baseURL, timeout = 1000 } = options ?? {};

    const axiosClient = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // last to be executed
    axiosClient.interceptors.request.use((config) => {
      return config;
    });
    this.requestMiddlewares.reverse().forEach((middleware) => {
      axiosClient.interceptors.request.use(...middleware);
    });
    this.responseMiddlewares.reverse().forEach((middleware) => {
      axiosClient.interceptors.response.use(...middleware);
    });
    return axiosClient;
  }
}
