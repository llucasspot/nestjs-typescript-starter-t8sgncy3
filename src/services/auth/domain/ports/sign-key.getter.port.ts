import { Getter } from '../../../../shared/core/getter';
import { KeyPrivateInfo } from './jwks.service.port';

export abstract class SignKeyGetterPort extends Getter<KeyPrivateInfo> {}
