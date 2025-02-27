import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-Exercise.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}
