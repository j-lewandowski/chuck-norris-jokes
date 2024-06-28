import { MinLength } from 'class-validator';

export class CreateJokeDto {
  @MinLength(1, {
    message: 'Content is too short',
  })
  joke: string;
  userId: string;
}
