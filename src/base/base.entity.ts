import { PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'boolean', nullable: true })
  active?: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_date?: Date;

  @Column({ type: 'int', nullable: true })
  created_by?: number;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_date?: Date;

  @Column({ type: 'int', nullable: true })
  updated_by?: number;
}
