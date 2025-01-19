import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingPort } from '../../../../../../shared/hashing/domain/hashing.port';
import { UserI } from '../../../../../../shared/jwt-guard/decorators/user.decorator';
import { AuthServicePort } from '../../../../domain/auth-service/auth.service.port';
import {
  SignInDto,
  SignUpDto,
} from '../../../../domain/auth-service/dtos/auth.dto';
import { AuthResponse } from '../../../../domain/auth-service/dtos/auth.response';
import { UserServicePort } from '../../../../domain/user-service/user.service.port';
import { UserRepositoryPort } from '../../domain/user-repository.port';

@Injectable()
export class AuthServiceLocalAdapter implements AuthServicePort {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly hashingService: HashingPort,
    private readonly jwtService: JwtService,
    private readonly userService: UserServicePort,
  ) {}

  async signInUser(userId: string): Promise<AuthResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.buildAuthResponse(user);
  }

  async signUp({ email, password }: SignUpDto): Promise<AuthResponse> {
    const user = await this.userService.createUser({
      email,
      password,
    });
    return this.buildAuthResponse(user);
  }

  async signIn(dto: SignInDto): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashingService.compare(
      dto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(user);
  }

  private async buildAuthResponse(user: UserI) {
    const userId = user.id;
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    return { userId, accessToken };
  }
}
