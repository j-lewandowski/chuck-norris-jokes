import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

    const token = await this.jwtService.signAsync(
      { id, email },
      { secret: process.env.JWT_SECRET },
    );

    return { token };
  }

  async signUp(credentials: SignUpDto) {
    const user = await this.usersService.create(credentials);
    const { id, email } = user;
    const token = await this.jwtService.signAsync({ id, email });
    return { token };
  }
}
