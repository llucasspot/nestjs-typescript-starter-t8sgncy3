import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { KlassEntity } from '../../../../domain/klass.entity';
import { CreateKlassEntityBody } from '../../../../domain/ports/klasses-repository.port';

@Table({ tableName: 'klasses' })
export class KlassSequelizeModel
  extends Model<KlassEntity, CreateKlassEntityBody>
  implements KlassEntity
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.UUIDV4)
  projectId: string;
}
