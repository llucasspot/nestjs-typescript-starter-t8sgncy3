import { Getter } from '../../../core/getter';

export abstract class MicroserviceTokenGetterPort extends Getter<
  Promise<string>
> {}
