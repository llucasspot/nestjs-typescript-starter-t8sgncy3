import { AuthResponse } from './dtos/auth.response';

export abstract class AuthMicroserviceServicePort {
  abstract buildMicroserviceToken(): Promise<AuthResponse>;
}
