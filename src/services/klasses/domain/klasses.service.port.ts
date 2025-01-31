import { CreateKlassBody } from './dtos/create-klass.body';
import { GetKlassBody } from './dtos/get-klass.body';
import { KlassDto } from './dtos/klass.dto';
import { UpdateKlassBody } from './dtos/update-klass.body';

export abstract class KlassesServicePort {
  abstract findAll(body?: GetKlassBody): Promise<KlassDto[]>;

  abstract createOne(body: CreateKlassBody): Promise<KlassDto>;

  abstract findOneById(id: string): Promise<KlassDto>;

  abstract updateOne(id: string, body: UpdateKlassBody): Promise<KlassDto>;

  abstract deleteOne(id: string): Promise<void>;
}
