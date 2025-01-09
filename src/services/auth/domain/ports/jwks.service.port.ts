export type JwKey = {
  kty: string;
  kid: string;
  n: string;
  e: string;
  alg: string;
  use: string;
};

export type Jwks = {
  keys: JwKey[];
};

export type AvailableAlgorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'none';

export type KeyPrivateInfo = {
  kid: string;
  publicKey: string;
  privateKey: string;
  alg: AvailableAlgorithm;
};

export abstract class JwksServicePort {
  public readonly keyPrivateInfos: KeyPrivateInfo[];

  abstract getJwks(): Promise<Jwks>;
}
