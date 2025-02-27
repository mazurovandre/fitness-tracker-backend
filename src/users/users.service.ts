import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from '../hash/hash.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, avatar, password, about } = createUserDto;
    const userInDB = await this.userRepository.find({
      where: [{ username, email }],
    });

    if (userInDB.length) {
      throw new NotFoundException(
        'Пользователь с таким email или username уже зарегистрирован',
      );
    }

    const hashedPassword = await this.hashService.hashPassword(password);

    const user = this.userRepository.create({
      username,
      email,
      avatar,
      about,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    delete user.password;
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findByUserName(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findMany(query: string): Promise<User[]> {
    const usersWithPassword = await this.userRepository.find({
      where: [{ username: query }, { email: query }],
    });

    return usersWithPassword.map((user) => {
      delete user.password;

      return user;
    });
  }

  async updateOneById(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { username, email, password } = updateUserDto;

    if (email) {
      const userUsesEmail = await this.userRepository.findOne({
        where: { email: email },
      });

      if (userUsesEmail && userUsesEmail.id !== userId) {
        throw new ConflictException('Email уже занят');
      }
    }

    if (username) {
      const isUsernameExists = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });

      if (isUsernameExists && isUsernameExists.id !== userId) {
        throw new ConflictException('Username уже занят');
      }
    }

    if (password) {
      updateUserDto.password = await this.hashService.hashPassword(password);
    }

    const userToBeUpdated = await this.userRepository.findOne({
      select: {
        username: true,
        email: true,
        password: true,
      },
      where: {
        id: userId,
      },
    });

    for (const key in updateUserDto) {
      userToBeUpdated[key] = updateUserDto[key];
    }

    await this.userRepository.update({ id: userId }, userToBeUpdated);
    const newUser = await this.userRepository.findOneBy({ id: userId });

    delete newUser.password;

    return newUser;
  }
}
