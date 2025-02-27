import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { ExercisesService } from './exercises.service';

@Controller('Exercises')
export class ExercisesController {
  constructor(private readonly ExercisesService: ExercisesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Req() req,
    @Body() createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    return await this.ExercisesService.create(req.user.id, createExerciseDto);
  }

  @Get('last')
  async findLast(): Promise<Exercise[]> {
    return await this.ExercisesService.findLast();
  }

  @Get('top')
  async findTop(): Promise<Exercise[]> {
    return await this.ExercisesService.findTop();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Exercise> {
    return await this.ExercisesService.findOneById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') ExerciseId: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @Req() req,
  ): Promise<Exercise> {
    return await this.ExercisesService.updateOneById(
      req.user.id,
      ExerciseId,
      updateExerciseDto,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async removeOne(
    @Req() req,
    @Param('id') ExerciseId: string,
  ): Promise<Exercise> {
    return await this.ExercisesService.removeOneById(req.user.id, ExerciseId);
  }
}
