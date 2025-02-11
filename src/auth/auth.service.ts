import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { SignUpDto } from '../pipes/signUpDto';
import { UsersService } from '../users/users.service';

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
    return await this.usersService.updateUser(user);
  }

  async resetPassword(email: string) {
    let user = await this.usersService.findOne(email);
    user.password = await this.usersService.hashPassword(user.cardno);
    return await this.usersService.updateUser(user);
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
    if (await this.usersService.findOne(signUpDto.email)) {
      throw new ConflictException();
    }
    this.usersService.updateUser(user);
    const { password, ...jwtinfo } = user;
    return {
      data: {
        token: await this.jwtService.signAsync(jwtinfo),
      },
    };
  }
}
