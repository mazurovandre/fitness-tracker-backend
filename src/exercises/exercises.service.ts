import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private ExerciseRepository: Repository<Exercise>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(id: number, createExerciseDto: CreateExerciseDto) {
    const user = await this.userRepository.findOneBy({ id });

    delete user.password;

    return await this.ExerciseRepository.save({
      ...createExerciseDto,
      owner: user,
    });
  }

  async findLast() {
    return await this.ExerciseRepository.find({
      order: { createdAt: 'DESC' },
      skip: 0,
      take: 40,
    });
  }

  async findTop() {
    return await this.ExerciseRepository.find({
      order: { name: 'DESC' },
      skip: 0,
      take: 20,
    });
  }

  async findOneById(ExerciseId: string) {
    const Exercise = await this.ExerciseRepository.findOne({
      where: { id: ExerciseId },
    });

    if (!Exercise) {
      throw new NotFoundException('Упражнение не найдено');
    }

    return Exercise;
  }

  async updateOneById(
    userId: number,
    ExerciseId: string,
    updateExerciseDto: UpdateExerciseDto,
  ) {
    const ExerciseToBeUpdated = await this.ExerciseRepository.findOne({
      where: { id: ExerciseId },
    });

    if (!ExerciseToBeUpdated) {
      throw new NotFoundException('Упражнение не найдено');
    }

    await this.ExerciseRepository.update(ExerciseId, updateExerciseDto);
    return await this.ExerciseRepository.findOneBy({ id: ExerciseId });
  }

  async removeOneById(userId: number, ExerciseId: string) {
    const ExerciseToBeRemoved = await this.ExerciseRepository.findOne({
      where: { id: ExerciseId },
    });

    if (!ExerciseToBeRemoved) {
      throw new NotFoundException('Упражнение не найдено');
    }

    await this.ExerciseRepository.remove(ExerciseToBeRemoved);
    return ExerciseToBeRemoved;
  }
}
