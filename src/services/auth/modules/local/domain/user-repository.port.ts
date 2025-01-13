import { SignUpDto } from '../../../domain/dtos/auth.dto';
import { User } from '../../../domain/dtos/user.entity';

export abstract class UserRepositoryPort {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(body: SignUpDto): Promise<User>;
}
