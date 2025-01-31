import { KlassEntity } from '../klass.entity';

export type CreateKlassEntityBody = Omit<KlassEntity, 'id'>;
export type UpdateKlassEntityBody = Partial<CreateKlassEntityBody>;
export type GetKlassEntityBody = Partial<{
  id: KlassEntity['id'] | KlassEntity['id'][];
  name: KlassEntity['name'] | KlassEntity['name'][];
  projectId: KlassEntity['projectId'] | KlassEntity['projectId'][];
}>;

export abstract class KlassesRepositoryPort {
  abstract create(body: CreateKlassEntityBody): Promise<KlassEntity>;

  abstract findById(id: string): Promise<KlassEntity | null>;

  abstract findAll(findBody?: GetKlassEntityBody): Promise<KlassEntity[]>;

  abstract update(
    id: string,
    body: UpdateKlassEntityBody,
  ): Promise<KlassEntity>;

  abstract delete(id: string): Promise<void>;
}
