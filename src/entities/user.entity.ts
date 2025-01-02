import { Role } from 'src/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user', { orderBy: { cardno: 'ASC' }, name: 'user' })
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  cardno: string;

  @Column({ default: '1234' })
  password: string;

  @Column({ type: 'simple-array', default: [Role.User] })
  roles: Role[];

  @Column({ default: true })
  active: boolean;
}
