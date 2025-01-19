import { SignUpDto } from '../../../domain/auth-service/dtos/auth.dto';
import { User } from '../../../domain/dtos/user.entity';

export abstract class UserRepositoryPort {
  abstract findById(id: string): Promise<User | null>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract create(body: SignUpDto): Promise<User>;
}
