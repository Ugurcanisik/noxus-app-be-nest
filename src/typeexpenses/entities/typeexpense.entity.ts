import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expense } from "../../expenses/entities/expense.entity";

@Entity('Typeexpense')
export class Typeexpense {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany((type) => Expense, (expense) => expense.typeexpense)
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  name: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
