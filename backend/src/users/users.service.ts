import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private saltOrRounds = 10;

  async create(createUserDto: CreateUserDto) {
    const existingUsers = await this.prisma.user.count({
      where: { email: createUserDto.email },
    });

    if (existingUsers > 0) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );
    const newUser = {
      ...createUserDto,
      password: hashedPassword,
    };

    // this.mockUsers.push(newUser);
    await this.prisma.user.create({
      data: newUser,
    });

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({});
    return users;
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return null;
    }
    return user;
  }

  async remove(email: string) {
    const existingUsers = await this.prisma.user.count({
      where: { email: email },
    });

    if (existingUsers > 0) {
      throw new ConflictException('User with this email already exists');
    }

    await this.prisma.user.delete({ where: { email: email } });
    return {
      message: 'Deleted user successfully',
    };
  }
}
