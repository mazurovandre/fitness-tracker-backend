import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  IsDate,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkoutDto {
  @IsNotEmpty()
  @IsUUID()
  exerciseId: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  workoutDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  sets: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  reps: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(500)
  weight?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(300)
  rest?: number;
}
