import { PartialBy } from '../../../../../shared/core/partial-by.utils';
import { ProjectEntity } from './project.entity';

export type CreateProjectEntityBody = PartialBy<
  Omit<ProjectEntity, 'id'>,
  'state'
>;
