import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { CreateProjectDto } from '../../../../../../domain/dtos/create-project.dto';
import { Project } from '../../../../../../domain/dtos/project.entity';

@Table({ tableName: 'projects' })
export class ProjectSequelizeModel extends Model<Project, CreateProjectDto> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
}
