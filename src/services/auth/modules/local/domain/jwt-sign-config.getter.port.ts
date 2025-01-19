import { Getter } from '../../../../../shared/core/getter';
import { AvailableAlgorithm } from '../../../../../shared/jwks/modules/local/domain/jwk-from-public-key-pem.extractor.port';

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
  alg: AvailableAlgorithm;
  kid: string;
};

export abstract class JwtSignConfigGetterPort extends Getter<JwtSignConfig> {}
