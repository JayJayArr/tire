import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TimeEntry {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  indevice: string;

  @Column()
  outdevice?: string;

  @Column()
  intime: Date;

  @Column()
  outtime?: Date;
}
