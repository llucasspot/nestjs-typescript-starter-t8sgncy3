import { SequelizeDatabaseService } from '../../../../../shared/database/infrastructure/sequelize/sequelize.database.service';
import { Project } from './models/project.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectSequelizeDatabaseService {
  constructor(
    private readonly sequelizeDatabaseService: SequelizeDatabaseService,
  ) {
    sequelizeDatabaseService.sequelize.addModels([Project]);
  }
}
