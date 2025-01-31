import { IntersectionType, OmitType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PictureDto } from '../../../pictures/domain/picture.dto';
import { KlassProject } from '../../../project/domain/dtos/project.dto';
import { KlassStudentDto } from '../../../students/domain/student.dto';
import { CreateKlassBody } from './create-klass.body';
import { EntityDto } from './entity.dto';

export class KlassDto extends IntersectionType(EntityDto, CreateKlassBody) {
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => KlassProject)
  project?: KlassProject;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KlassStudentDto)
  @Transform(({ value }) => value ?? [])
  students: KlassStudentDto[] = [];
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureDto)
  @Transform(({ value }) => value ?? [])
  photos: PictureDto[] = [];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  get studentIds(): string[] {
    return this.students.map((student) => student.id);
  }

  @Expose()
  @IsArray()
  @IsString({ each: true })
  get photoIds(): string[] {
    return this.photos.map((photo) => photo.id);
  }
}

export class ProjectKlassDto extends OmitType(KlassDto, ['project']) {}

export class StudentKlassDto extends OmitType(KlassDto, [
  'students',
  'studentIds',
]) {}
