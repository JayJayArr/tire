import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { TimeCheckpoint } from 'src/entities/timecheckpoint.entity';
import { TimeEntry } from 'src/entities/timeentry.entity';
import { User } from 'src/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProWatchService implements OnModuleInit {
  @InjectEntityManager('ProWatchConnection')
  private pwEntityManager: EntityManager;
  @InjectRepository(TimeCheckpoint)
  private timeCheckPointRepository: Repository<TimeCheckpoint>;
  @InjectRepository(User)
  private usersRepository: Repository<TimeCheckpoint>;
  @InjectRepository(TimeEntry)
  private timeEntryRepository: Repository<TimeEntry>;
  private readonly logger = new Logger(ProWatchService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async proWatchPuller() {
    this.logger.debug('Starting Pull from ProWatch');
    let runbegin = new Date(); //Save the current time as a max date
    let before = await this.timeCheckPointRepository.findOneBy({
      name: 'ProWatch',
    });

    let usedCardnos = [];
    let rawCardnos = await this.usersRepository
      .createQueryBuilder('user')
      .select(['cardno'])
      .where('user.active == true')
      .getRawMany()
      .then((result) => {
        result.forEach((row) => {
          usedCardnos.push(row.cardno);
        });
      });
    console.log(usedCardnos);
    // let querystring = `SELECT * FROM EV_LOG WHERE EVNT_ADDR=500 AND EVNT_DAT >= CAST('${before.timestamp.toISOString()}' as datetime) AND EVNT_DAT < CAST('${runbegin.toISOString()}' as datetime) AND cardno in ${usedCardnos}`;
    let querystring = `SELECT * FROM EV_LOG WHERE EVNT_ADDR=500 AND EVNT_DAT >= CAST('${before.timestamp.toISOString()}' as datetime) AND EVNT_DAT < CAST('${runbegin.toISOString()}' as datetime)`;

    const rawPWData = await this.pwEntityManager.query(querystring);
    //TODO: Pull all events from ProWatch that are newer than the ProWatch Timestamp in the sqlite db
    //TODO: Parse each event into an in- or outbound event and save to the database, outbound only if the last in-event was less than 12 hours ago

    rawPWData.forEach((row) => {
      console.log(row.CARDNO);
    });
  }

  async onModuleInit() {
    if (
      !(await this.timeCheckPointRepository.findOneBy({ name: 'ProWatch' }))
    ) {
      this.timeCheckPointRepository.insert({
        name: 'ProWatch',
        timestamp: new Date('2023-01-02T00:00:00'),
      });
    }
  }
}
