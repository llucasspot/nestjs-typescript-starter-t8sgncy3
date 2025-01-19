import { Injectable } from '@nestjs/common';
import { AppConfigPort } from '../domain/ports/app-config.port';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class AppConfigProcessEnvAdapter implements AppConfigPort {
  get port(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }

  get globalPrefix(): string {
    return process.env.GLOBAL_PREFIX || 'api';
  }

  get cors(): CorsOptions {
    return {
      origin: ['http://localhost'],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: [],
    };
  }
}
