import { Injectable, Logger } from '@nestjs/common';
import { ProjectEmitterPort } from '../../domain/ports/project.emitter.port';

@Injectable()
export class ProjectEmitterLocalAdapter implements ProjectEmitterPort {
  private readonly logger = new Logger(this.constructor.name);

  emit(event: 'project deleted', body: { projectId: string }): Promise<void>;
  emit(event: string, body: unknown): Promise<void>;
  async emit(event: unknown, body: unknown): Promise<void> {
    this.logger.log(event, body);
    switch (event) {
      case 'project deleted': {
      }
    }
  }
}
