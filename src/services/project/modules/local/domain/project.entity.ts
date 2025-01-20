import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { SchoolEntity } from './school.entity';

export enum ProjectState {
  Published = 'published',
  Unpublished = 'unpublished',
}

export class ProjectEntity {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
  @Expose()
  shotDate!: Date;
  @Expose()
  orderEndDate!: Date;
  @Expose()
  @IsOptional()
  messageForClients?: string;
  @Expose()
  state!: ProjectState;

  @Expose()
  schoolId!: string;

  @Expose()
  @Type(() => SchoolEntity)
  school?: SchoolEntity;
}
