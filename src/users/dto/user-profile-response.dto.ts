import {
  IsNotEmpty,
  IsInt,
  Length,
  IsString,
  IsUrl,
  IsEmail,
  IsDate,
} from 'class-validator';

export class UserProfileResponseDto {
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
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
