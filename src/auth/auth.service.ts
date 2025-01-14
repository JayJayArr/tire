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
    // TODO: Encrypt passwords at rest and compare encrypted passwords, use argon2.verify
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...jwtinfo } = user;
    return {
      data: {
        token: await this.jwtService.signAsync(jwtinfo),
      },
    };
  }

  async changePassword(username: string, password: string) {
    //change the password in the db
    //TODO: change the password in the db
  }

  async signUp(signUpDto: SignUpDto) {
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
