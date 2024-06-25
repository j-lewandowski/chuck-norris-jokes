import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  id: string;
  @IsEmail({}, { message: 'You must provide a valid email.' })
  email: string;
  @MinLength(1, { message: 'You must provide a password.' })
  password: string;
}
