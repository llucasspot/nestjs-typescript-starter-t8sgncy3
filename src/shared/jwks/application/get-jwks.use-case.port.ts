import { UseCase } from '../../core/use-case';
import { Jwk } from '../modules/local/domain/jwk.creator.port';

export type Jwks = {
  keys: Jwk[];
};

export abstract class GetJwksUseCasePort implements UseCase<Promise<Jwks>> {
  abstract execute(): Promise<Jwks>;
}
