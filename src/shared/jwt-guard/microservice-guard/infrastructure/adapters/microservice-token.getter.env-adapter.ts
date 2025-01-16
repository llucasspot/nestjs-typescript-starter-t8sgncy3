import { Injectable } from '@nestjs/common';
import { MicroserviceTokenGetterPort } from '../../domain/microservice-token.getter.port';

@Injectable()
export class MicroserviceTokenGetterEnvAdapter
  implements MicroserviceTokenGetterPort
{
  async get(): Promise<string> {
    const token = process.env.MICROSERVICE_TOKEN;
    if (!token) {
      throw new Error('MICROSERVICE_TOKEN environment variable is not set');
    }
    return token;
  }
}
