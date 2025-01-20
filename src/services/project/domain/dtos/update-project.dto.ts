import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ example: 'My Updated Project', minLength: 3, required: false })
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiProperty({ example: 'Updated project description', required: false })
  @IsString()
  description?: string;
}
