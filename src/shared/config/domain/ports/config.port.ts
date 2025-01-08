export abstract class ConfigPort {
  abstract get jwtSecret(): string;
  abstract get jwtExpiresIn(): string;
}
