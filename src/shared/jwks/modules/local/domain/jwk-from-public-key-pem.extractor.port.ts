import { Extractor } from '../../../../core/extractor';

export const symmetricAlgorithms = ['HS256', 'HS384', 'HS512'] as const;

export type SymmetricAlgorithm = (typeof symmetricAlgorithms)[number];

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

export type AsymmetricAlgorithm = (typeof asymmetricAlgorithms)[number];

export const algorithms = [
  ...asymmetricAlgorithms,
  ...symmetricAlgorithms,
] as const;

export type AvailableAlgorithm = (typeof algorithms)[number];

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
  alg: AsymmetricAlgorithm;
  use: string;
};

export abstract class JwkFromPublicKeyPemExtractorPort extends Extractor<
  Promise<Jwk>,
  { publicKeyPem: string; alg: AsymmetricAlgorithm }
> {}
