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

export abstract class JwksServicePort {
  public readonly keys: {
    kid: string;
    publicKey: string;
    privateKey: string;
  }[];

  abstract getJwks(): Promise<Jwks>;
}
