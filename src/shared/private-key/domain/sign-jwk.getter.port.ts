import { Getter } from '../../core/getter';
import { JwkPrivateInfo } from '../../jwks/modules/local/domain/jwk.creator.port';

export abstract class SignJwkGetterPort extends Getter<JwkPrivateInfo> {}
