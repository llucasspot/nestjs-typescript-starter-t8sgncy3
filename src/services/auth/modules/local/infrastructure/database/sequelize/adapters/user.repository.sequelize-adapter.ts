import { Injectable } from '@nestjs/common';
import { SequelizeDatabaseService } from '../../../../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import { SignUpDto } from '../../../../../../domain/auth-service/dtos/auth.dto';
import { User } from '../../../../../../domain/dtos/user.entity';
import { UserRepositoryPort } from '../../../../domain/user-repository.port';
import { UserSequelizeModel } from '../models/user.sequelize.model';

@Injectable()
export class SequelizeUserRepository implements UserRepositoryPort {
  private readonly model = UserSequelizeModel;

  constructor(sequelizeDatabaseService: SequelizeDatabaseService) {
    sequelizeDatabaseService.addModel(this.model);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { id } });
    if (!user) return null;
    return new User(
      user.id,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async create(body: SignUpDto): Promise<User> {
    const user = await this.model.create({
      email: body.email,
      password: body.password,
    });

    return new User(
      user.id,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }
}
