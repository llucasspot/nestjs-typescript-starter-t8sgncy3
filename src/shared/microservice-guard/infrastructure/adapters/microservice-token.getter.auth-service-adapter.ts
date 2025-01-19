import { Injectable } from '@nestjs/common';
import { AuthMicroserviceServicePort } from '../../../../services/auth/domain/auth-service/auth-microservice.service.port';
import { MicroserviceTokenGetterPort } from '../../domain/microservice-token.getter.port';

@Injectable()
export class MicroserviceTokenGetterAuthServiceAdapter
  implements MicroserviceTokenGetterPort
{
  constructor(
    private readonly authMicroserviceServicePort: AuthMicroserviceServicePort,
  ) {}

  async get(): Promise<string> {
    const { accessToken } =
      await this.authMicroserviceServicePort.buildMicroserviceToken();
    return accessToken;
  }
}
