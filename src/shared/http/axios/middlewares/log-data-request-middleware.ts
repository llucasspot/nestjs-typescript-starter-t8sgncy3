import { InternalAxiosRequestConfig } from 'axios';
import { LoggerI } from '../../logger.interface';
import { RequestMiddleware } from '../axios-instance.builder';

export function logDataRequestMiddleware(logger: LoggerI): RequestMiddleware {
  return [
    (config) => {
      const requestId = getRequestIdOnConfig(config);
      logger.log(`[${requestId}]`, 'Request URL :', buildFullPath(config));
      logger.log(`[${requestId}]`, 'Request Method :', config.method);
      logger.log(`[${requestId}]`, 'Request Headers :', config.headers);
      if (config.data) {
        logger.log(`[${requestId}]`, 'Request Body :', config.data);
      }
      return config;
    },
  ];
}

export const getRequestIdOnConfig = (
  config?: InternalAxiosRequestConfig<any>,
) => {
  // @ts-expect-error axios requestId
  const requestId: string | undefined = config?.['requestId'];
  if (!requestId) {
    return 'unknownRequestId';
  }
  return requestId;
};

function buildFullPath(config: InternalAxiosRequestConfig) {
  const baseURL = config.baseURL;
  const requestedURL = config.url;
  if (baseURL && requestedURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

function isAbsoluteURL(url: string) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

function combineURLs(baseURL: string, relativeURL: string) {
  return relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}
