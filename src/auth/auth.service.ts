import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { HashService } from '../hash/hash.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async auth(user: User): Promise<SignInResponseDto> {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validatePassword(
    username: string,
    password: string,
  ): Promise<SignUpResponseDto> {
    const user = await this.usersService.findByUserName(username);
    const isVerified = await this.hashService.verifyHash(
      password,
      user.password,
    );

    if (!user || !isVerified) {
      return null;
    }

    delete user.password;

    return user;
  }
}
