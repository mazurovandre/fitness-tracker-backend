import { Module } from '@nestjs/common';
import { ExercisesController } from './Exercises.controller';
import { ExercisesService } from './Exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, User])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [TypeOrmModule],
})
export class ExercisesModule {}
