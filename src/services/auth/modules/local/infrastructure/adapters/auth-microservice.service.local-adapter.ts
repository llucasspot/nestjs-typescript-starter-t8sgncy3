import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthMicroserviceServicePort } from '../../../../domain/auth-service/auth-microservice.service.port';
import { MicroserviceAuthResponse } from '../../../../domain/auth-service/dtos/auth.response';

@Injectable()
export class AuthMicroserviceServiceLocalAdapter
  implements AuthMicroserviceServicePort
{
  constructor(private readonly jwtService: JwtService) {}

  async buildMicroserviceToken(): Promise<MicroserviceAuthResponse> {
    const accessToken = await this.jwtService.signAsync({
      role: 'microservice',
    });
    return { accessToken };
  }
}
