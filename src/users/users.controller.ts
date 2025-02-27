import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async find(@Req() req): Promise<UserProfileResponseDto> {
    return await this.usersService.findOneById(req.user.id);
  }

  @Patch('me')
  async update(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    return await this.usersService.updateOneById(req.user.id, updateUserDto);
  }

  @Get(':username')
  async FindByUserName(
    @Param('username') username: string,
  ): Promise<UserPublicProfileResponseDto> {
    const userFound = await this.usersService.findByUserName(username);

    delete userFound.password;

    return userFound;
  }

  @Post('find')
  async findMany(
    @Body() findUserDto: FindUsersDto,
  ): Promise<UserPublicProfileResponseDto[]> {
    return await this.usersService.findMany(findUserDto.query);
  }
}
