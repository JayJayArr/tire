import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/pipes/signInDto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/users/users.decorator';
import { SignUpDto } from 'src/pipes/signUpDto';
import { ResetPassDto } from 'src/pipes/resetPassDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('sign-up')
  signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    if (signUpDto.password === signUpDto.confirmPassword) {
      return this.authService.signUp(signUpDto);
    } else {
      throw new BadRequestException("passwords don't match");
    }
  }

  //TODO: /auth/reset-pass needs to update the password for an authorized user
  @UseGuards(AuthGuard)
  @Put('reset-pass')
  resetpass(@User() user, @Body() resetPassDto: ResetPassDto) {
    console.log(resetPassDto);
    if (resetPassDto.password == resetPassDto.confirmPassword) {
      return this.authService.changePassword(user.email, resetPassDto.password);
    } else {
      throw new BadRequestException("passwords don't match");
    }
  }
}
