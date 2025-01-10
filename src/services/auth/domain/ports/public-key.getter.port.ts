import { Getter } from '../../../../shared/core/getter';

export abstract class PublicKeyGetterPort extends Getter<
  string,
  { token: string }
> {}
