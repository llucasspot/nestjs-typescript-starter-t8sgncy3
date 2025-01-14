import { Jwk } from '../modules/local/domain/jwk-from-public-key-pem.extractor.port';

export type Jwks = {
  keys: Jwk[];
};

export abstract class JwksServicePort {
  abstract getJwks(): Promise<Jwks>;
}
