import { Role } from 'src/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('', { orderBy: { cardno: 'ASC' } })
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  cardno: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: Role[];

  @Column()
  active: boolean;
}
