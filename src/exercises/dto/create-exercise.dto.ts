import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @IsString()
  content: string;

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

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(300)
  rest: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(500)
  weight: number;
}
