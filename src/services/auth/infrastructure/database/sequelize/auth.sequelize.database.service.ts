import { SequelizeDatabaseService } from '../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import { User } from './models/user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthSequelizeDatabaseService {
  constructor(
    private readonly sequelizeDatabaseService: SequelizeDatabaseService,
  ) {
    sequelizeDatabaseService.sequelize.addModels([User]);
  }
}
