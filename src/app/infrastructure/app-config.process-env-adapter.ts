import { Injectable } from '@nestjs/common';
import { AppConfigPort } from '../domain/ports/app-config.port';

@Injectable()
export class AppConfigProcessEnvAdapter implements AppConfigPort {
  get port(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }

  get globalPrefix(): string {
    return process.env.GLOBAL_PREFIX || 'api';
  }
}
