import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('timeentry', { orderBy: { intime: 'DESC' }, name: 'timeentry' })
export class TimeEntry {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  indevice: string;

  @Column({ nullable: true })
  outdevice?: string;

  @Column()
  intime: Date;

  @Column({ nullable: true })
  outtime?: Date;

  @Column()
  cardno: string;

  @Column({ default: false })
  faulty?: boolean;
}
