import { Injectable } from '@nestjs/common';
import { CreateJokeDto } from './dto/create-joke.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JokesService {
  private mockJokes = [];

  create(createJokeDto: CreateJokeDto) {
    this.mockJokes.push({ id: uuidv4(), ...createJokeDto });
    return createJokeDto;
  }

  findAllUserJokes(userId: string) {
    return this.mockJokes.filter((joke) => joke.userId === userId);
  }

  remove(id: string) {
    this.mockJokes = this.mockJokes.filter((user) => user.id !== id);
    return {
      message: 'Deleted user successfully',
    };
  }
}
