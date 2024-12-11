import { Role } from 'src/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cardno: string;

  @Column('simple-array')
  roles: Role[];

  @Column()
  active: boolean;
}
