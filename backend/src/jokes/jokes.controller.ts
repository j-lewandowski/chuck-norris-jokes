import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from './dto/create-joke.dto';
import { ProtectedGuard } from 'src/protected/protected.guard';

@UseGuards(ProtectedGuard)
@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Post()
  async create(@Req() req, @Body() createJokeDto: CreateJokeDto) {
    return await this.jokesService.create({
      ...createJokeDto,
      userId: req.user.email,
    });
  }

  @Get()
  async findAllUserJokes(@Req() req) {
    return await this.jokesService.findAllUserJokes(req.user.email);
  }

  @Delete('joke/:id')
  async remove(@Param('id') id: string) {
    return await this.jokesService.remove(id);
  }
}
