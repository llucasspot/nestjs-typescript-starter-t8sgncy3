import { IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  description: string;
}

export class UpdateProjectDto {
  @IsString()
  @MinLength(3)
  name?: string;

  @IsString()
  description?: string;
}
