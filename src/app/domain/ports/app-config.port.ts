import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export abstract class AppConfigPort {
  abstract get port(): number;

  abstract get globalPrefix(): string;

  abstract get cors(): CorsOptions;
}
