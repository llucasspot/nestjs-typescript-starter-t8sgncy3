export abstract class AppConfigPort {
  abstract get port(): number;
  abstract get globalPrefix(): string;
}
