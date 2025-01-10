import { SignUpDto } from '../../application/dtos/auth.dto';
import { User } from '../entities/user.entity';

export abstract class UserRepositoryPort {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(body: SignUpDto): Promise<User>;
}
