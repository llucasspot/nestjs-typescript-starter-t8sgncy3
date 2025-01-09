import { Injectable } from '@nestjs/common';
import { SwaggerConfigPort } from '../domain/ports/swagger-config.port';

@Injectable()
export class SwaggerConfigProcessEnvAdapter implements SwaggerConfigPort {
  get title(): string {
    return process.env.SWAGGER_TITLE || 'NestJS API';
  }

  get description(): string {
    return process.env.SWAGGER_DESCRIPTION || 'The NestJS API description';
  }

  get version(): string {
    return process.env.SWAGGER_VERSION || '1.0';
  }

  get path(): string {
    return process.env.SWAGGER_PATH || 'api';
  }
}
