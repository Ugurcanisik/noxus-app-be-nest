import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from 'src/staff/entities/staff.entity';
import { Typeexpense } from '../../typeexpenses/entities/typeexpense.entity';

@Entity('Expense')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Typeexpense, (typeexpense) => typeexpense.id)
  typeexpense: Typeexpense[];

  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

  @Column({ type: 'int', width: 15, nullable: true })
  total: number;

  @ManyToOne((type) => Staff, (staff) => staff.id)
  staff: Staff[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  date: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
