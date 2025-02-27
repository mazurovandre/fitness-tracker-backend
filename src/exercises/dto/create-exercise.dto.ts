import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class ContentBlock {
  @IsString()
  @IsNotEmpty()
  type: 'text' | 'image';

  @IsString()
  content?: string;

  @IsString()
  src?: string;

  @IsString()
  alt?: string;
}

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentBlock)
  content: ContentBlock[];
}
