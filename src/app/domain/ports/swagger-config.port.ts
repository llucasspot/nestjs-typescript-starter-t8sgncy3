export abstract class SwaggerConfigPort {
  abstract get title(): string;
  abstract get description(): string;
  abstract get version(): string;
  abstract get path(): string;
}
