import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private mockUsers = [
    { id: uuidv4(), email: 'test@test.com', password: '12345' },
    { id: uuidv4(), email: 'test2@test.com', password: '12345' },
  ];

  create(createUserDto: CreateUserDto) {
    const newUser = { id: uuidv4(), ...createUserDto };
    this.mockUsers.push(newUser);
    return newUser;
  }

  findAll() {
    return this.mockUsers;
  }

  findOne(id: string) {
    const user = this.mockUsers.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  remove(id: string) {
    const removedUser = this.mockUsers.find((user) => user.id === id);
    if (!removedUser) {
      throw new Error('User not found');
    }
    this.mockUsers = this.mockUsers.filter((user) => user.id !== id);
    return removedUser;
  }
}
