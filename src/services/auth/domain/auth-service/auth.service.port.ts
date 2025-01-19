import { SignInDto, SignUpDto } from './dtos/auth.dto';
import { AuthResponse } from './dtos/auth.response';

export abstract class AuthServicePort {
  abstract signUp(body: SignUpDto): Promise<AuthResponse>;

  abstract signIn(dto: SignInDto): Promise<AuthResponse>;

  abstract signInUser(userId: string): Promise<AuthResponse>;
}
