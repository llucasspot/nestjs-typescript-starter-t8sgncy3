import { OmitType, PickType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ProjectKlassDto } from '../../../klasses/domain/dtos/klass.dto';
import { ProjectSchool } from '../../../schools/domain/school.dto';
import { ProjectProductDto } from './project-product.dto';
import { ProjectEntity } from '../../modules/local/domain/project.entity';

export class ProjectDto extends PickType(ProjectEntity, [
  'id',
  'name',
  'shotDate',
  'orderEndDate',
  'messageForClients',
  'state',
  'schoolId',
]) {
  @Expose()
  @IsOptional()
  school?: ProjectSchool;

  @Expose()
  @Type(() => ProjectKlassDto)
  @Transform(({ value }) => value ?? [])
  klasses: ProjectKlassDto[] = [];

  @Expose()
  @Type(() => ProjectProductDto)
  @Transform(({ value }) => value ?? [])
  products: ProjectProductDto[] = [];

  @Expose()
  get klassIds(): string[] {
    return this.klasses.map((klass) => klass.id);
  }

  @Expose()
  get productIds(): string[] {
    return this.products.map((product) => product.id);
  }
}

export class SchoolProject extends OmitType(ProjectDto, ['school']) {}

export class KlassProject extends OmitType(ProjectDto, [
  'klasses',
  'klassIds',
]) {}
