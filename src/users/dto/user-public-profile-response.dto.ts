import {
  IsNotEmpty,
  IsInt,
  Length,
  IsString,
  IsUrl,
  IsDate,
} from 'class-validator';

export class UserPublicProfileResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  username: string;

  @IsNotEmpty()
  @Length(2, 200)
  @IsString()
  about: string;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
