import { IsEmail } from 'class-validator';

export class RequestPassDto {
  @IsEmail()
  email: string;
}
