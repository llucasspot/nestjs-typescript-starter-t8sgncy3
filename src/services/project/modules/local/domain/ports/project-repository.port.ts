import { PartialBy } from '../../../../../../shared/core/partial-by.utils';
import { ProjectEntity, ProjectState } from '../project.entity';

export type CreateProjectEntityBody = PartialBy<
  Omit<ProjectEntity, 'id'>,
  'state'
>;
export type UpdateProjectEntityBody = Partial<CreateProjectEntityBody>;
export type GetProjectEntityBody = Partial<{
  id?: string | string[];
  name?: string | string[];
  shotDate?: Date;
  orderEndDate?: Date;
  messageForClients?: string | string[];
  state?: ProjectState | ProjectState[];
  schoolId?: string | string[];
}>;

export abstract class ProjectRepositoryPort {
  abstract create(body: CreateProjectEntityBody): Promise<ProjectEntity>;

  abstract findById(id: string): Promise<ProjectEntity | null>;

  abstract findAll(body?: GetProjectEntityBody): Promise<ProjectEntity[]>;

  abstract update(
    id: string,
    body: UpdateProjectEntityBody,
  ): Promise<ProjectEntity>;

  abstract delete(id: string): Promise<void>;
}
