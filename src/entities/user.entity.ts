import { Role } from 'src/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { orderBy: { cardno: 'ASC' }, name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string;

  @Column()
  cardno: string;

  @Column({ nullable: true })
  password?: string;

  @Column('simple-array')
  roles: Role[];

  @Column({ default: true })
  active: boolean;
}
