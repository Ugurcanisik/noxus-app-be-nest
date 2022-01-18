import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Ciro')
export class Ciro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', width: 20, nullable: true })
  total: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  date: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
