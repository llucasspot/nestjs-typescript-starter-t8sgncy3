import { Getter } from '../../../../../shared/core/getter';

export type BaseStringUrl = `http://${string}/` | `https://${string}/`;
export type StringUrl = `http://${string}` | `https://${string}`;

export type ExpiresIn =
  | `${number}m`
  | `${number}h`
  | `${number}d`
  | `${number}w`
  | `${number}y`;

export type JwtSignConfig = {
  expiresIn: ExpiresIn;
  refreshTokenExpiresIn: ExpiresIn;
  issuer: BaseStringUrl;
  audience: BaseStringUrl;
};

export abstract class JwtSignConfigGetterPort extends Getter<JwtSignConfig> {}
