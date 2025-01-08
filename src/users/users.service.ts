import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/types';
import { DeleteResult, EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User, 'TireConnection')
    private usersRepository: Repository<User>,
    @InjectEntityManager('ProWatchConnection')
    private pwEntityManager: EntityManager,
  ) { }
  private readonly logger = new Logger(UsersService.name);
  private readonly users: User[] = [
    {
      id: 1,
      email: 'jakob.janus@nutz.com',
      password: 'changeme',
      cardno: '10490',
      roles: [Role.User, Role.PowerUser, Role.Admin],
      active: true,
    },
    {
      id: 2,
      email: 'admin@admin.com',
      password: 'admin',
      cardno: '0000',
      roles: [Role.User, Role.PowerUser, Role.Admin],
      active: true,
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email, active: true });
  }

  async findAll(): Promise<User[] | undefined> {
    return this.usersRepository.find();
  }

  async saveUser(user: User): Promise<User | undefined> {
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async pullFromProWatch(): Promise<number | undefined> {
    this.logger.log('Pulling Users from Access Control');
    return new Promise(async (resolve, reject) => {
      let querystring = `select EMAIL_PW as email, BADGE_C.STAT_COD as status, BADGE_C.CARDNO as cardno  from BADGE
		    inner join BADGE_V on BADGE_V.ID = BADGE.ID
		    inner join BADGE_C on BADGE_C.ID = BADGE.ID
		    WHERE BADGE_C.STAT_COD = 'A'
		    AND EMAIL_PW IS NOT NULL
        AND STAT_COD IS NOT NULL
        AND CARDNO IS NOT NULL
        AND ISNUMERIC(CARDNO) = 1`;
      await this.pwEntityManager
        .query(querystring)
        .then(async (response) => {
          response.forEach(async (user) => {
            let createUser = {
              email: user.email,
              cardno: user.cardno,
              roles: [Role.User],
            };
            let savedUser = await this.usersRepository.findOneBy({
              email: user.email,
            });
            if (savedUser) {
              this.usersRepository.update(
                { id: savedUser.id },
                { email: user.email, cardno: user.cardno },
              );
            } else {
              this.usersRepository.save(createUser);
            }
          });
          this.logger.log(`Synced ${response.length} users`);
          resolve(response.length);
        })
        .catch((err) => reject(err));
    });
  }

  onModuleInit() {
    this.users.forEach((user) => {
      this.usersRepository.save(user);
    });
  }
}
