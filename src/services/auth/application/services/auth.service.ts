import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryPort } from '../../domain/ports/user-repository.port';
import { HashingPort } from '../../domain/ports/hashing.port';
import { User } from '../../domain/entities/user.entity';
import { SignUpDto, SignInDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly hashingService: HashingPort,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<{ token: string }> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await this.hashingService.hash(dto.password);
    const user = await this.userRepository.create(
      User.create(dto.email, hashedPassword),
    );

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token };
  }

  async signIn(dto: SignInDto): Promise<{ token: string }> {
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

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token };
  }
}
