import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserBody } from 'src/services/auth/domain/user-service/dtos/get-user.body';
import { UserI } from 'src/shared/jwt-guard/decorators/user.decorator';
import { HashingPort } from '../../../../../../shared/hashing/domain/hashing.port';
import { UserServicePort } from '../../../../domain/user-service/user.service.port';
import { UserRepositoryPort } from '../../domain/user-repository.port';
import { CreateUserBody } from 'src/services/auth/domain/user-service/dtos/create-user.body';

@Injectable()
export class UserServiceLocalAdapter implements UserServicePort {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly hashingService: HashingPort,
  ) {}

  async createUser(body: CreateUserBody): Promise<UserI> {
    const existingUser = await this.userRepository.findByEmail(body.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await this.hashingService.hash(body.password);
    return this.userRepository.create({
      email: body.email,
      password: hashedPassword,
    });
  }

  async getUser({ id }: GetUserBody): Promise<UserI | null> {
    return this.userRepository.findById(id);
  }
}
