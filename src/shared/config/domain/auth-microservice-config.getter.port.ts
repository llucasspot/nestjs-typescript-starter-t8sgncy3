import { StringUrl } from '../../../services/auth/modules/local/domain/jwt-sign-config.getter.port';
import { Getter } from '../../core/getter';

export type AuthMicroserviceConfig = {
  jwksEndpoint: StringUrl;
};

export abstract class AuthMicroserviceConfigGetterPort extends Getter<AuthMicroserviceConfig> {}
