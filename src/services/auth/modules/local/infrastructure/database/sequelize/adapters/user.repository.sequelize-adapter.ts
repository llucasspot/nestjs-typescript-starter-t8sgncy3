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
    const model = await this.model.findOne({ where: { id } });
    if (!model) return null;
    return new User(
      model.id,
      model.email,
      model.password,
      model.createdAt,
      model.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const model = await this.model.findOne({ where: { email } });
    if (!model) return null;
    return new User(
      model.id,
      model.email,
      model.password,
      model.createdAt,
      model.updatedAt,
    );
  }

  async create(body: SignUpDto): Promise<User> {
    const model = await this.model.create({
      email: body.email,
      password: body.password,
    });
    return new User(
      model.id,
      model.email,
      model.password,
      model.createdAt,
      model.updatedAt,
    );
  }
}
