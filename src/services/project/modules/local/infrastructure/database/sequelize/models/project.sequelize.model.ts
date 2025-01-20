import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CreateProjectEntityBody } from '../../../../domain/create-project-entity.body';
import { ProjectEntity, ProjectState } from '../../../../domain/project.entity';
import { SchoolSequelizeModel } from './school.sequelize.model';

@Table({ tableName: 'projects' })
export class ProjectSequelizeModel
  extends Model<ProjectEntity, CreateProjectEntityBody>
  implements ProjectEntity
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  shotDate: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  orderEndDate: Date;

  @AllowNull(true)
  @Column(DataType.TEXT)
  messageForClients?: string;

  @AllowNull(false)
  @Default(ProjectState.Unpublished)
  @Column(DataType.ENUM(...Object.values(ProjectState))) // Replace with actual ProjectState values
  state: ProjectState;

  @AllowNull(false)
  @ForeignKey(() => SchoolSequelizeModel)
  @Column(DataType.UUIDV4)
  schoolId: string;

  @BelongsTo(() => SchoolSequelizeModel, 'schoolId')
  school?: SchoolSequelizeModel;
}
