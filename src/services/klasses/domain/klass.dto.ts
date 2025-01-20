import { OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PictureDto } from '../../pictures/domain/picture.dto';
import { KlassProject } from '../../project/domain/dtos/project.dto';
import { KlassStudentDto } from '../../students/domain/student.dto';

export class KlassDto {
  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsString()
  name!: string;
  projectId!: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => KlassProject)
  project?: KlassProject;
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KlassStudentDto)
  students: KlassStudentDto[] = [];
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureDto)
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
