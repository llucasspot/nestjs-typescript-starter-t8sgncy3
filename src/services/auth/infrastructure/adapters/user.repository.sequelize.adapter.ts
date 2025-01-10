import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../../application/dtos/auth.dto';
import { User as UserEntity } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/ports/user-repository.port';
import { User } from '../database/sequelize/models/user.model';

@Injectable()
export class SequelizeUserRepository implements UserRepositoryPort {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    return new UserEntity(
      user.id,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async create(body: SignUpDto): Promise<UserEntity> {
    const user = await User.create({
      email: body.email,
      password: body.password,
    });

    return new UserEntity(
      user.id,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }
}
