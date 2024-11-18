import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/pipes/signInDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
    console.log('received login request:', signInDto.email);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
