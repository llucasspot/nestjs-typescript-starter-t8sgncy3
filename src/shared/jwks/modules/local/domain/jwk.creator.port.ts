import { Creator } from '../../../../core/creator';

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

export type Jwk = {
  kid: string;
  kty: string;
  n: string;
  e: string;
  alg: string;
  use: string;
};

export type JwkPrivateInfo = {
  kid: string;
  privateKey: string;
  alg: AvailableAlgorithm;
};

export type CreateJwkBody = {
  kid: string;
  use: 'sig';
  alg: AvailableAlgorithm;
};

export type CreateJwkResponse = {
  jwk: Jwk;
  jwkPrivateInfo: JwkPrivateInfo;
};

export abstract class JwkCreatorPort extends Creator<
  Promise<CreateJwkResponse>,
  CreateJwkBody
> {}
