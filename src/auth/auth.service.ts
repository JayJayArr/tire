import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    // TODO: Encrypt passwords at rest and compare encrypted passwords
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...jwtinfo } = user;
    return {
      token: await this.jwtService.signAsync(jwtinfo),
    };
  }
}
