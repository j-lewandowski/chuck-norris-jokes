import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(credentials: SignInDto) {
    const user = this.usersService.findOne(credentials.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { id, email, password } = user;
    const isPasswordMatching = await bcrypt.compare(
      credentials.password,
      password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined');
    }
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET);

    return token;
  }

  async signUp(credentials: SignUpDto) {
    const user = await this.usersService.create(credentials);
    const { id, email } = user;
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET);
    return token;
  }
}
