import { Length, Min, Max } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  @Min(1)
  @Max(10)
  sets: number;

  @Column()
  @Min(1)
  @Max(100)
  reps: number;

  @Column()
  @Min(0)
  @Max(300)
  rest: number;

  @Column({ type: 'float' })
  @Min(0)
  @Max(500)
  weight: number;
}
