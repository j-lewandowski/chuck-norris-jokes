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
  create(@Req() req, @Body() createJokeDto: CreateJokeDto) {
    return this.jokesService.create({ ...createJokeDto, userId: req.user.id });
  }

  @Get(':userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.jokesService.findAllByUser(userId);
  }

  @Delete('joke/:id')
  remove(@Param('id') id: string) {
    return this.jokesService.remove(id);
  }
}
