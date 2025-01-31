import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { SchoolEntity } from './school.entity';

export enum ProjectState {
  Published = 'published',
  Unpublished = 'unpublished',
}

export class ProjectEntity {
  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsDate()
  shotDate!: Date;

  @Expose()
  @IsDate()
  orderEndDate!: Date;

  @Expose()
  @IsString()
  @IsOptional()
  messageForClients?: string;

  @Expose()
  @IsEnum(ProjectState)
  state!: ProjectState;

  @Expose()
  @IsString()
  schoolId!: string;

  @Expose()
  @Type(() => SchoolEntity)
  school?: SchoolEntity;
}
