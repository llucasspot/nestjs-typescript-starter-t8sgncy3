import { Extractor } from '../../../../core/extractor';

export type AvailableAlgorithm =
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512';

export type ECJwk = {
  kty: 'EC';
  crv: string;
  x: string;
  y: string;
};
export type RSAJwk = {
  kty: 'RSA';
  e: string;
  n: string;
  d?: string | undefined;
  p?: string | undefined;
  q?: string | undefined;
  dp?: string | undefined;
  dq?: string | undefined;
  qi?: string | undefined;
};

export type Jwk = (ECJwk | RSAJwk) & {
  kid: string;
  alg: AvailableAlgorithm;
  use: string;
};

export abstract class JwkFromPublicKeyPemExtractorPort extends Extractor<
  Promise<Jwk>,
  { publicKeyPem: string; alg: AvailableAlgorithm }
> {}
