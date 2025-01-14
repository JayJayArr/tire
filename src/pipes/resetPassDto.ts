import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPassDto {
  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  password: string;
}
