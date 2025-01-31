import { IntersectionType, OmitType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { EntityDto } from '../../klasses/domain/dtos/entity.dto';
import { SchoolProject } from '../../project/domain/dtos/project.dto';
import { CreateSchoolBody } from './create-school.body';

export enum AvailableCurrency {
  EUR = 'EUR',
}

export class SchoolDto extends IntersectionType(EntityDto, CreateSchoolBody) {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SchoolProject)
  @Transform(({ value }) => value ?? [])
  projects: SchoolProject[] = [];

  get projectIds(): string[] {
    return this.projects.map((project) => project.id);
  }
}

export class ProjectSchool extends OmitType(SchoolDto, [
  'projects',
  'projectIds',
]) {}
