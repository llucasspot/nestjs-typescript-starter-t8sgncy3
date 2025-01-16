import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateUserProjectDto } from '../../../../../../domain/dtos/create-user-project.dto';
import { UserProject } from '../../../../../../domain/dtos/user-project.entity';

@Table({ tableName: 'user_projects' })
export class UserProjectSequelizeModel
  extends Model<UserProject, CreateUserProjectDto>
  implements UserProject
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
  projectId: string;
}
