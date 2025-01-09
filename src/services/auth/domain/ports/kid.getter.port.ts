import { Getter } from '../../../../shared/core/getter';

export abstract class KidGetterPort extends Getter<
  string | null,
  { token: string }
> {}
