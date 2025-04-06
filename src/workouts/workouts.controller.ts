import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('workouts')
@UseGuards(JwtGuard)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto, @Req() req: Request) {
    return this.workoutsService.create(createWorkoutDto, req.user['id']);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.workoutsService.findAll(req.user['id']);
  }

  @Get('date')
  findByDate(@Query('date') date: string, @Req() req: Request) {
    return this.workoutsService.findByDate(new Date(date), req.user['id']);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.workoutsService.findOne(id, req.user['id']);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
    @Req() req: Request,
  ) {
    return this.workoutsService.update(id, updateWorkoutDto, req.user['id']);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.workoutsService.remove(id, req.user['id']);
  }
}
