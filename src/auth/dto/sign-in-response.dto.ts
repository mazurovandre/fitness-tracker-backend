import { IsJWT, IsNotEmpty } from 'class-validator';

export class SignInResponseDto {
  @IsNotEmpty()
  @IsJWT()
  access_token: string;
}
