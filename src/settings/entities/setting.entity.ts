import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Setting")
export class Setting {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  title: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  keywords: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  logo: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  ico: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  description: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  companyName: string;

  @Column({ type: "boolean", default: false })
  deleted: boolean;
}
