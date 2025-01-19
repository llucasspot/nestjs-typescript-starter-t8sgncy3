import { Extractor } from '../../../core/extractor';

export abstract class JwtHeaderExtractorPort extends Extractor<
  {
    kid: string | undefined;
    alg: string | undefined;
  },
  { token: string }
> {}
