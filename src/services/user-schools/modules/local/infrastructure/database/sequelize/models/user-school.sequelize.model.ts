import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateUserSchoolDto } from '../../../../../../domain/dtos/create-user-school.dto';
import { UserSchool } from '../../../../../../domain/dtos/user-school.entity';

@Table({ tableName: 'user_schools' })
export class UserSchoolSequelizeModel
  extends Model<UserSchool, CreateUserSchoolDto>
  implements UserSchool
{
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  schoolId: string;
}
