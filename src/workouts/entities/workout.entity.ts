import { Min, Max } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'date' })
  workoutDate: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Exercise)
  @JoinColumn()
  exercise: Exercise;

  @Column()
  exerciseId: string;

  @Column()
  @Min(1)
  @Max(10)
  sets: number;

  @Column()
  @Min(1)
  @Max(100)
  reps: number;

  @Column({ nullable: true })
  @Min(0)
  @Max(500)
  weight: number;

  @Column({ nullable: true })
  @Min(0)
  @Max(300)
  rest: number;
}
