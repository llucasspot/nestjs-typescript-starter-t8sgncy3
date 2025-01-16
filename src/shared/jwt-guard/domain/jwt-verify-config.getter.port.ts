import { Getter } from '../../core/getter';
import { BaseStringUrl } from '../../../services/auth/modules/local/domain/jwt-sign-config.getter.port';

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

export type JwtVerifyConfig = {
  issuer: BaseStringUrl;
  audience: BaseStringUrl;
  algorithms: AsymmetricAlgorithms;
};

export abstract class JwtVerifyConfigGetterPort extends Getter<JwtVerifyConfig> {}
