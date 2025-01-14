import { Injectable, Logger } from '@nestjs/common';
import { AuthMicroserviceConfigGetterPort } from '../../../../config/domain/auth-microservice-config.getter.port';
import { HttpAxiosClient } from '../../../../http/axios/http-axios.client';
import { Jwks, JwksServicePort } from '../../../domain/jwks.service.port';

@Injectable()
export class JwksServiceApiAdapter implements JwksServicePort {
  private readonly client: HttpAxiosClient;

  constructor(
    private readonly authMicroserviceConfigGetter: AuthMicroserviceConfigGetterPort,
  ) {
    this.client = new HttpAxiosClient(new Logger('JwksServiceApiAdapter'));
  }

  // @Cacheable('get-jwks')
  async getJwks(): Promise<Jwks> {
    const response = await this.client.get<Jwks>(
      this.authMicroserviceConfigGetter.get().jwksEndpoint,
    );
    return response.data;
  }
}
