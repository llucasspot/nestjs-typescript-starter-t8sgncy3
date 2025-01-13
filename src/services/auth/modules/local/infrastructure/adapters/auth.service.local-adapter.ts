import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthServicePort } from '../../../../domain/auth.service.port';
import { User } from '../../../../domain/dtos/user.entity';
import { HashingPort } from '../../../../../../shared/hashing/domain/hashing.port';
import { UserRepositoryPort } from '../../domain/user-repository.port';
import { SignInDto, SignUpDto } from '../../../../domain/dtos/auth.dto';
import { AuthResponse } from '../../../../domain/dtos/auth.response';

@Injectable()
export class AuthServiceLocalAdapter implements AuthServicePort {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly hashingService: HashingPort,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(body.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await this.hashingService.hash(body.password);
    const user = await this.userRepository.create({
      email: body.email,
      password: hashedPassword,
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

  private async buildAuthResponse(user: User) {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    return { accessToken };
  }
}
