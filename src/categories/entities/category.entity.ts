import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany((type) => Product, (product) => product.category)
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
