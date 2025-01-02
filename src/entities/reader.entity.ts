import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('reader', { name: 'reader', orderBy: { name: 'ASC' } })
export class Reader {
  @PrimaryColumn({ type: 'varbinary', length: 18 })
  id: Buffer;

  @Column()
  name: String;

  @Column({ default: false })
  active: Boolean;
}
