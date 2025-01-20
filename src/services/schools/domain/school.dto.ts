import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SchoolProject } from '../../project/domain/dtos/project.dto';

export enum AvailableCurrency {
  EUR = 'EUR',
}

export class SchoolDto {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
  @Expose()
  currency!: AvailableCurrency;
  @Expose()
  city!: string;
  @Expose()
  projects: SchoolProject[] = [];

  get projectIds(): string[] {
    return this.projects.map((project) => project.id);
  }
}

export class ProjectSchool extends OmitType(SchoolDto, [
  'projects',
  'projectIds',
]) {}
