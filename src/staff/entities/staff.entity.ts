import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "../../expenses/entities/expense.entity";

@Entity("Staff")
export class Staff {
  @PrimaryGeneratedColumn("uuid")
  @OneToMany((type) => Expense, (expense) => expense.staff)
  id: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  startDate: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  endDate: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  deleted: boolean;

}
