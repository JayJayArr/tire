import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  private readonly users: User[] = [
    {
      userId: 1,
      email: 'jakob.janus@nutz.com',
      password: 'changeme',
      cardno: '10490',
      roles: [Role.Admin, Role.PowerUser, Role.User],
      active: true,
    },
    {
      userId: 2,
      email: 'dennis.molleker@nutz.com',
      password: 'guess',
      cardno: '10635',
      roles: [Role.User],
      active: true,
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  onModuleInit() {
    // this.users.forEach((user) => {
    //   this.usersRepository.insert(user);
    // });
  }
}
