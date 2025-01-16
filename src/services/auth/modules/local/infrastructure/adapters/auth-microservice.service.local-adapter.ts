import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthMicroserviceServicePort } from '../../../../domain/auth-microservice.service.port';
import { AuthResponse } from '../../../../domain/dtos/auth.response';

@Injectable()
export class AuthMicroserviceServiceLocalAdapter
  implements AuthMicroserviceServicePort
{
  constructor(private readonly jwtService: JwtService) {}

  async buildMicroserviceToken(): Promise<AuthResponse> {
    const accessToken = await this.jwtService.signAsync({
      role: 'microservice',
    });
    return { accessToken };
  }
}
