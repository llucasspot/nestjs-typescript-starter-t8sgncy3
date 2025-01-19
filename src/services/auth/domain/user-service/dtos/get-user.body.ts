import { IsUUID } from 'class-validator';

export class GetUserBody {
  @IsUUID(4)
  id: string;
}
