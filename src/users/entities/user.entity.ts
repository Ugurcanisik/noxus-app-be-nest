import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  userName: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 600, nullable: true })
  token: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  role: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
