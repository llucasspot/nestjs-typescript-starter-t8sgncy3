import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'projects' })
export class Project extends Model {
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
