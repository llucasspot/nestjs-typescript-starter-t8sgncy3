import { UserI } from '../../../../shared/jwt-guard/decorators/user.decorator';
import { CreateUserBody } from './dtos/create-user.body';
import { GetUserBody } from './dtos/get-user.body';

export abstract class UserServicePort {
  abstract getUser(body: GetUserBody): Promise<UserI | null>;

  abstract createUser(body: CreateUserBody): Promise<UserI>;
}
