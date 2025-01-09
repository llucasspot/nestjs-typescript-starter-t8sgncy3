export type StringUrl = `http://${string}/` | `https://${string}/`;

export type ExpiresIn =
  | `${number}m`
  | `${number}h`
  | `${number}d`
  | `${number}w`
  | `${number}y`;

export const asymmetricAlgorithms = [
  'RS256',
  'RS384',
  'RS512',
  'ES256',
  'ES384',
  'ES512',
  'PS256',
  'PS384',
  'PS512',
] as const;

export type AsymmetricAlgorithms = typeof asymmetricAlgorithms;

export type JwtSignConfig = {
  expiresIn: ExpiresIn;
  refreshTokenExpiresIn: ExpiresIn;
  issuer: StringUrl;
  audience: StringUrl;
};

export type JwtVerifyConfig = {
  issuer: StringUrl;
  audience: StringUrl;
  algorithms: AsymmetricAlgorithms;
};

export abstract class ConfigPort {
  abstract get jwtSecret(): string;
  abstract get jwtSignOptions(): JwtSignConfig;
  abstract get jwtVerifyOptions(): JwtVerifyConfig;
}
