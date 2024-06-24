import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'You must provide a valid email.' })
  email: string;
  @MinLength(1, { message: 'You must provide a password.' })
  password: string;
}
