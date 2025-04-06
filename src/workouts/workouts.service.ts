import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entities/workout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
  ) {}

  create(createWorkoutDto: CreateWorkoutDto, userId: number) {
    const workout = this.workoutRepository.create({
      ...createWorkoutDto,
      userId,
    });
    return this.workoutRepository.save(workout);
  }

  findAll(userId: number) {
    return this.workoutRepository.find({
      where: { userId },
      relations: ['exercise'],
    });
  }

  findOne(id: string, userId: number) {
    return this.workoutRepository.findOne({
      where: { id, userId },
      relations: ['exercise'],
    });
  }

  findByDate(date: Date, userId: number) {
    return this.workoutRepository.find({
      where: {
        workoutDate: date,
        userId,
      },
      relations: ['exercise'],
    });
  }

  update(id: string, updateWorkoutDto: UpdateWorkoutDto, userId: number) {
    return this.workoutRepository.update({ id, userId }, updateWorkoutDto);
  }

  remove(id: string, userId: number) {
    return this.workoutRepository.delete({ id, userId });
  }
}
