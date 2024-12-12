import { Role } from 'src/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column()
  cardno: string;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: Role[];

  @Column()
  active: boolean;
}
