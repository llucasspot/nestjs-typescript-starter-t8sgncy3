import { Getter } from '../../core/getter';
import { BaseStringUrl } from '../../../services/auth/modules/local/domain/jwt-sign-config.getter.port';
import { AvailableAlgorithm } from '../../jwks/modules/local/domain/jwk-from-public-key-pem.extractor.port';

export type JwtVerifyConfig = {
  issuer: BaseStringUrl;
  audience: BaseStringUrl;
  algorithms: readonly AvailableAlgorithm[];
};

export abstract class JwtVerifyConfigGetterPort extends Getter<JwtVerifyConfig> {}
