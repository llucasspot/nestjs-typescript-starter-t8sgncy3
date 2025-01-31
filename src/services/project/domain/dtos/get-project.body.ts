import { Expose } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { ProjectState } from '../../modules/local/domain/project.entity';

export class GetProjectBody {
  @Expose()
  @IsOptional()
  id?: string | string[];

  @Expose()
  @IsOptional()
  name?: string | string[];

  @Expose()
  @IsDate()
  @IsOptional()
  shotDate?: Date;

  @Expose()
  @IsDate()
  @IsOptional()
  orderEndDate?: Date;

  @Expose()
  @IsOptional()
  messageForClients?: string | string[];

  @Expose()
  @IsOptional()
  state?: ProjectState | ProjectState[];

  @Expose()
  @IsOptional()
  schoolId?: string | string[];
}
