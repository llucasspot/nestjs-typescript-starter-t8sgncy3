import { MicroserviceAuthResponse } from './dtos/auth.response';

export abstract class AuthMicroserviceServicePort {
  abstract buildMicroserviceToken(): Promise<MicroserviceAuthResponse>;
}
