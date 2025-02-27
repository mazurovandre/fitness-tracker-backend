import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signIn(@Req() req): Promise<SignInResponseDto> {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
