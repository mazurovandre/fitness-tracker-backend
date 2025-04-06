import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  private readonly exercises: Exercise[] = [
    {
      id: '1',
      name: 'Приседания со штангой',
      content: `Базовое упражнение для развития силы ног

Техника выполнения:
1. Установите штангу на стойки на уровне верхней части груди
2. Подойдите к штанге, присядьте под нее и упритесь ей в трапеции
3. Снимите штангу со стоек и отойдите на 2-3 шага назад
4. Поставьте ноги на ширине плеч, носки слегка наружу
5. Сделайте вдох, напрягите пресс
6. Начните приседать, отводя таз назад
7. Достигнув параллели с полом, начните подъем
8. Выпрямитесь и выдохните
9. Повторите нужное количество раз`,
      sets: 4,
      reps: 10,
      rest: 90,
      weight: 60,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Жим штанги лежа',
      content: `Техника выполнения:
1. Лягте на скамью, поставив ноги firmly на пол
2. Возьмитесь за штангу хватом чуть шире плеч
3. Снимите штангу со стоек
4. Опустите штангу к средней части груди, контролируя движение
5. Коснувшись груди, выжмите штангу вверх
6. В верхней точке руки полностью выпрямлены
7. Повторите заданное количество раз
8. После последнего повторения верните штангу на стойки`,
      sets: 3,
      reps: 8,
      rest: 120,
      weight: 80,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Становая тяга',
      content: `Техника выполнения:
1. Подойдите к штанге, поставив ноги на ширине плеч
2. Наклонитесь и возьмитесь за гриф смешанным хватом
3. Колени согнуты, спина прямая
4. Взгляд направлен вперед
5. Поднимите штангу, выпрямляя ноги и спину
6. В верхней точке полностью выпрямитесь
7. Опустите штангу под контролем
8. Повторите нужное количество раз
9. Не округляйте спину при выполнении`,
      sets: 5,
      reps: 5,
      rest: 180,
      weight: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  create(createExerciseDto: CreateExerciseDto) {
    const exercise: Exercise = {
      ...createExerciseDto,
      id: (this.exercises.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.exercises.push(exercise);

    return exercise;
  }

  findAll() {
    return this.exercises;
  }

  findOne(id: string) {
    return this.exercises.find((exercise) => exercise.id === id);
  }

  update(id: string, updateExerciseDto: UpdateExerciseDto) {
    const index = this.exercises.findIndex((exercise) => exercise.id === id);
    if (index !== -1) {
      this.exercises[index] = {
        ...this.exercises[index],
        ...updateExerciseDto,
        updatedAt: new Date(),
      };

      return this.exercises[index];
    }

    return null;
  }

  remove(id: string) {
    const filteredExercises = this.exercises.filter(
      (exercise) => exercise.id !== id,
    );

    const removedExercise = this.exercises.find(
      (exercise) => exercise.id === id,
    );

    if (!removedExercise) {
      return null;
    }

    this.exercises.length = 0;
    this.exercises.push(...filteredExercises);

    return removedExercise;
  }
}
