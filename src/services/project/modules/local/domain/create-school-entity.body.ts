import { SchoolEntity } from './school.entity';

export type CreateSchoolEntityBody = Omit<SchoolEntity, 'id'>;
