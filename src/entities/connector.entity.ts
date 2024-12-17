import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Connector {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  timestamp: Date;

  @Column()
  active: boolean;
}
