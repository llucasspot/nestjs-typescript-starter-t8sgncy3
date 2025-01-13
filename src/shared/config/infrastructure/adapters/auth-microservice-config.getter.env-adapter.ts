import { Injectable } from '@nestjs/common';
import { StringUrl } from '../../../../services/auth/modules/local/domain/jwt-sign-config.getter.port';
import { AuthMicroserviceConfigGetterPort } from '../../domain/auth-microservice-config.getter.port';

@Injectable()
export class AuthMicroserviceConfigGetterEnvAdapter
  implements AuthMicroserviceConfigGetterPort
{
  get() {
    return {
      jwksEndpoint:
        (process.env.JWKS_ENDPOINT as StringUrl) ||
        'http://localhost:3000/api/.well-known/jwks.json',
    };
  }
}
