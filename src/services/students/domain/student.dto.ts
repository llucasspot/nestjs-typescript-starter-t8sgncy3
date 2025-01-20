import { OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { StudentKlassDto } from '../../klasses/domain/klass.dto';
import { PictureDto } from '../../pictures/domain/picture.dto';

export class StudentDto {
  @Expose()
  id!: string;
  @Expose()
  code!: string;
  @Expose()
  klassId!: string;
  @Expose()
  @IsOptional()
  klass?: StudentKlassDto;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureDto)
  photos: PictureDto[] = [];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  get photoIds(): string[] {
    return this.photos.map((photo) => photo.id);
  }
}

export class KlassStudentDto extends OmitType(StudentDto, ['klass']) {}
