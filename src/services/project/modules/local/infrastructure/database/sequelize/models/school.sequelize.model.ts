import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CreateSchoolEntityBody } from '../../../../domain/create-school-entity.body';
import {
  AvailableCurrency,
  SchoolEntity,
} from '../../../../domain/school.entity';
import { ProjectSequelizeModel } from './project.sequelize.model';

@Table({ tableName: 'schools' })
export class SchoolSequelizeModel
  extends Model<SchoolEntity, CreateSchoolEntityBody>
  implements SchoolEntity
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  city: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(AvailableCurrency))) // Replace with actual ProjectState values
  currency: AvailableCurrency;

  @HasMany(() => ProjectSequelizeModel, 'schoolId')
  projects?: ProjectSequelizeModel[];
}
