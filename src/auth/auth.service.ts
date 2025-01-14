import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { SignUpDto } from 'src/pipes/signUpDto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!(await this.usersService.verifyPassword(user.password, pass))) {
      throw new UnauthorizedException();
    }
    const { password, ...jwtinfo } = user;
    return {
      data: {
        token: await this.jwtService.signAsync(jwtinfo),
      },
    };
  }

  async changePassword(email: string, password: string) {
    let user = await this.usersService.findOne(email);
    user.password = await this.usersService.hashPassword(password);
    return await this.usersService.saveUser(user);
  }

  async signUp(signUpDto: SignUpDto) {
    signUpDto.password = await this.usersService.hashPassword(
      signUpDto.password,
    );
    let user: User = {
      roles: [],
      active: true,
      cardno: '',
      ...signUpDto,
    };
    this.usersService.saveUser(user);
    const { password, ...jwtinfo } = user;
    return {
      data: {
        token: await this.jwtService.signAsync(jwtinfo),
      },
    };
  }
}
