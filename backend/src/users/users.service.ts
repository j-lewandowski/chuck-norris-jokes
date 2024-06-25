import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private mockUsers = [
    { id: uuidv4(), email: 'test@test.com', password: '12345' },
    { id: uuidv4(), email: 'test2@test.com', password: '12345' },
  ];

  private saltOrRounds = 10;

  async create(createUserDto: CreateUserDto) {
    const existingUser = this.findOne(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );
    const newUser = {
      ...createUserDto,
      id: uuidv4(),
      password: hashedPassword,
    };

    this.mockUsers.push(newUser);

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  findAll() {
    const usersWithoutPassword = this.mockUsers.map((user) => ({
      id: user.id,
      email: user.email,
    }));
    return usersWithoutPassword;
  }

  findOne(email: string) {
    const user = this.mockUsers.find((user) => user.email === email);

    if (!user) {
      return null;
    }
    return user;
  }

  remove(id: string) {
    const removedUser = this.mockUsers.find((user) => user.id === id);
    if (!removedUser) {
      throw new NotFoundException('User not found');
    }
    this.mockUsers = this.mockUsers.filter((user) => user.id !== id);
    return {
      message: 'Deleted user successfully',
    };
  }
}
