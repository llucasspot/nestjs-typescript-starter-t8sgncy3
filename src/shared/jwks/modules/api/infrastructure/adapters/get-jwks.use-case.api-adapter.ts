import { Injectable, Logger } from '@nestjs/common';
import { AuthMicroserviceConfigGetterPort } from '../../../../../config/domain/auth-microservice-config.getter.port';
import { UseCase } from '../../../../../core/use-case';
import { HttpAxiosClient } from '../../../../../http/axios/http-axios.client';
import { Jwks } from '../../../../application/get-jwks.use-case.port';

@Injectable()
export class GetJwksUseCaseApiAdapter implements UseCase<Promise<Jwks>> {
  private readonly client: HttpAxiosClient;

  constructor(
    private readonly authMicroserviceConfigGetter: AuthMicroserviceConfigGetterPort,
  ) {
    this.client = new HttpAxiosClient(new Logger('GetJwksUseCaseApiAdapter'));
  }

  // @Cacheable('get-jwks')
  async execute(): Promise<Jwks> {
    const response = await this.client.get<Jwks>(
      this.authMicroserviceConfigGetter.get().jwksEndpoint,
    );
    return response.data;
  }
}
