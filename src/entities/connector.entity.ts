import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('connector', { name: 'connector' })
export class Connector {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ type: 'datetimeoffset' })
  timestamp: Date;

  @Column()
  active: boolean;
}
