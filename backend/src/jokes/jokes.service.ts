import { Injectable } from '@nestjs/common';
import { CreateJokeDto } from './dto/create-joke.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JokesService {
  constructor(private prisma: PrismaService) {}

  async create(createJokeDto: CreateJokeDto) {
    const joke = await this.prisma.joke.create({
      data: createJokeDto,
    });
    return joke;
  }

  async findAllUserJokes(userId: string) {
    const jokes = await this.prisma.joke.findMany({
      where: { userId: userId },
    });
    return jokes;
  }

  async remove(id: string) {
    await this.prisma.joke.delete({
      where: { id: id },
    });
    return {
      message: 'Deleted user successfully',
    };
  }
}
