import { Injectable } from '@nestjs/common';
import { Role, User } from 'src/types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      email: 'jakob.janus@nutz.com',
      password: 'changeme',
      cardno: '1234',
      role: Role.admin,
    },
    {
      userId: 2,
      email: 'jakob.rietdorf@nutz.com',
      password: 'guess',
      cardno: '7890',
      role: Role.user,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === username);
  }
}
