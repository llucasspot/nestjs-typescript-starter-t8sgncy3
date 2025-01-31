import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { EntityDto } from '../../../klasses/domain/dtos/entity.dto';
import { ProjectKlassDto } from '../../../klasses/domain/dtos/klass.dto';
import { ProjectSchool } from '../../../schools/domain/school.dto';
import { ProjectEntity } from '../../modules/local/domain/project.entity';
import { CreateProjectDto } from './create-project.dto';
import { ProjectProductDto } from './project-product.dto';

export class ProjectDto extends IntersectionType(
  EntityDto,
  CreateProjectDto,
  PickType(ProjectEntity, ['state']),
) {
  @Expose()
  @IsOptional()
  school?: ProjectSchool;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectKlassDto)
  @Transform(({ value }) => value ?? [])
  klasses: ProjectKlassDto[] = [];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
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
