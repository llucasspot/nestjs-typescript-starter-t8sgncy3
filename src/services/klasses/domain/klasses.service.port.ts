import { CreateKlassBody } from './dtos/create-klass.body';
import { GetCreateKlassBody } from './dtos/get-klass.body';
import { KlassDto } from './dtos/klass.dto';
import { UpdateKlassBody } from './dtos/update-klass.body';

export type KlassesServiceFindAllBody = Partial<{
  id: string | string[];
  name: string | string[];
  projectId: string | string[];
}>;

export abstract class KlassesServicePort {
  abstract findAll(body?: GetCreateKlassBody): Promise<KlassDto[]>;

  abstract createOne(body: CreateKlassBody): Promise<KlassDto>;

  abstract findOneById(id: string): Promise<KlassDto>;

  abstract updateOne(id: string, body: UpdateKlassBody): Promise<KlassDto>;

  abstract deleteOne(id: string): Promise<void>;
}
