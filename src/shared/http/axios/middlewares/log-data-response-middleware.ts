import { LoggerI } from '../../logger.interface';
import { ResponseMiddleware } from '../axios-instance.builder';
import { getRequestIdOnConfig } from './log-data-request-middleware';

export function logDataResponseMiddleware(logger: LoggerI): ResponseMiddleware {
  return [
    (response) => {
      const requestId = getRequestIdOnConfig(response.config);
      logger.log(`[${requestId}]`, 'Response Status :', response.status);
      logger.log(`[${requestId}]`, 'Response Data :', response.data);
      return response;
    },
    (error: any) => {
      logError(logger, error);
      error.isAlreadyLogged = true;
      return Promise.reject(error);
    },
  ];
}

export function logError(logger: LoggerI, error: any) {
  if (error.isAlreadyLogged) {
    return;
  }
  if (error.response) {
    const requestId = getRequestIdOnConfig(error.response.config);
    logger.error(`[${requestId}]`, 'Response Status :', error.response.status);
    logger.error(`[${requestId}]`, 'Response Data :', error.response.data);
    return;
  }
  const requestId = getRequestIdOnConfig(error.config);
  logger.error(`[${requestId}]`, 'Error :', error);
}
