import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  name: string;

  @Column({ type: 'int', width: 10, default: 0 })
  rank: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
