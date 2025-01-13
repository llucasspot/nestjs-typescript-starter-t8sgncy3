import { Jwks } from '../application/get-jwks.use-case.port';

export abstract class JwksServicePort {
  abstract getJwks(): Promise<Jwks>;
}
