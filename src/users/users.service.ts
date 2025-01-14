import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
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
            //check if the mail is already in the db, in that case update based on the mail address
            let savedUser = await this.usersRepository.findOneBy({
              email: user.email,
            });
            if (savedUser) {
              this.usersRepository.update(
                { id: savedUser.id },
                { email: user.email, cardno: user.cardno },
              );
            } else {
              let createUser = {
                email: user.email,
                cardno: user.cardno,
                roles: [Role.User],
                password: await this.hashPassword(user.cardno),
              };
              this.usersRepository.save(createUser);
            }
          });
          this.logger.log(`Synced ${response.length} users`);
          resolve(response.length);
        })
        .catch((err) => reject(err));
    });
  }
  async hashPassword(password: string) {
    //see OWASP
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 47104,
      parallelism: 1,
      timeCost: 2,
    });
  }

  async verifyPassword(hash: string, password: string) {
    //see OWASP
    return await argon2.verify(hash, password);
  }

  async onModuleInit() {
    this.users.forEach(async (user) => {
      user.password = await this.hashPassword(user.password);
      this.usersRepository.save(user);
    });
  }
}
