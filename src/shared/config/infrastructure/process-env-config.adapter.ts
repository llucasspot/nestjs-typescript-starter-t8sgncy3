import { Injectable } from '@nestjs/common';
import { ConfigPort } from '../domain/ports/config.port';

@Injectable()
export class ProcessEnvConfigAdapter implements ConfigPort {
  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'your-secret-key';
  }

  get jwtExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN || '1d';
  }
}
