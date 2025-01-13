import { Getter } from '../../../../../shared/core/getter';

export type StringUrl = `http://${string}/` | `https://${string}/`;

export type ExpiresIn =
  | `${number}m`
  | `${number}h`
  | `${number}d`
  | `${number}w`
  | `${number}y`;

export type JwtSignConfig = {
  expiresIn: ExpiresIn;
  refreshTokenExpiresIn: ExpiresIn;
  issuer: StringUrl;
  audience: StringUrl;
};

export abstract class JwtSignConfigGetterPort extends Getter<JwtSignConfig> {}
