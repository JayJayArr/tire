import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { TimeCheckpoint } from 'src/entities/timecheckpoint.entity';
import { TimeEntry } from 'src/entities/timeentry.entity';
import { User } from 'src/entities/user.entity';
import { EntityManager, IsNull, Repository } from 'typeorm';

@Injectable()
export class ProWatchService implements OnModuleInit {
  @InjectEntityManager('ProWatchConnection')
  private pwEntityManager: EntityManager;
  @InjectRepository(TimeCheckpoint)
  private timeCheckPointRepository: Repository<TimeCheckpoint>;
  @InjectRepository(User)
  private usersRepository: Repository<User>;
  @InjectRepository(TimeEntry)
  private timeEntryRepository: Repository<TimeEntry>;
  private readonly logger = new Logger(ProWatchService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async proWatchPuller() {
    this.logger.debug('Starting Pull from ProWatch');

    let runbegin = new Date(); //Save the current time as a max date
    let lastrun = await this.timeCheckPointRepository.findOneBy({
      name: 'ProWatch',
    });
    //TODO: check for the existence of a lastrun value and handle the error appropriately

    let usedCardnos = []; // get the cardnumbers of all active users out of the Repository
    await this.usersRepository
      .createQueryBuilder('user')
      .select('user.cardno')
      .where('user.active == true')
      .getMany()
      .then((result) => {
        result.forEach((row) => {
          usedCardnos.push(row.cardno);
        });
      });

    this.logger.debug(`Found ${usedCardnos.length} active cards`);
    this.logger.debug(
      `Searching for events between ${lastrun.timestamp.toISOString()} and ${runbegin.toISOString()}`,
    );

    let querystring = `SELECT EVNT_DAT, BADGE_C.CARDNO, LOGDEVDESCRP 
      FROM EV_LOG 
      INNER JOIN BADGE_C on EV_LOG.BADGENO = BADGE_C.ID
      WHERE EVNT_ADDR=500 
        AND EVNT_DAT >= CAST('${lastrun.timestamp.toISOString()}' as datetime) 
        AND EVNT_DAT < CAST('${runbegin.toISOString()}' as datetime) 
        AND CAST(BADGE_C.CARDNO as bigint) IN (${usedCardnos.toLocaleString()})
        ORDER BY EVNT_DAT ASC`;
    const pwEvents = await this.pwEntityManager.query(querystring);
    if (!pwEvents.length) {
      this.logger.debug(`No events found`);
    } else {
      this.parseEntries(pwEvents);
      //Update the timestamp in the DB
      lastrun.timestamp = runbegin;
      this.timeCheckPointRepository.save(lastrun);
    }
  }

  async parseEntries(
    entries: { EVNT_DAT: Date; CARDNO: string; LOGDEVDESCRP: string }[],
  ) {
    let openTransactionMap = new Map<string, TimeEntry>();
    this.logger.debug(`Parsing ${entries.length} events`);
    ///getting open transactions from the db
    let openTransactions = await this.timeEntryRepository.findBy({
      outtime: IsNull(),
    });
    //put open transactions into the hashmap
    openTransactions.forEach((transaction) => {
      openTransactionMap.set(transaction.cardno, transaction);
    });
    this.logger.debug(
      `Found ${openTransactions.length} open transactions to match`,
    );

    entries.forEach((entry) => {
      if (openTransactionMap.has(entry.CARDNO)) {
        // match the transactions, if the last event is more than 12 hours ago mark as faulty => fires if the person worked longer than 12 hours
        let openTransaction = openTransactionMap.get(entry.CARDNO);

        if (
          entry.EVNT_DAT.valueOf() - openTransaction.intime.valueOf() >=
          43200000
        ) {
          //mark the transaction as faulty and save
          openTransaction.faulty = true;
          this.timeEntryRepository.save(openTransaction);

          //create new transaction and save
          let newEntry: TimeEntry = {
            indevice: entry.LOGDEVDESCRP,
            intime: entry.EVNT_DAT,
            cardno: entry.CARDNO,
          };
          this.timeEntryRepository.create(newEntry);
          //update Hashmap with new Entry
          openTransactionMap.set(entry.CARDNO, newEntry);
        } else {
          //complete the openTransaction
          openTransaction.outtime = entry.EVNT_DAT;
          openTransaction.outdevice = entry.LOGDEVDESCRP;
          //save the completed transaction to the db
          this.timeEntryRepository.save(openTransaction);
          //remove the completed transaction from the hashmap
          openTransactionMap.delete(openTransaction.cardno);
        }
      } else {
        // insert new entry into the db

        let newEntry: TimeEntry = {
          indevice: entry.LOGDEVDESCRP,
          intime: entry.EVNT_DAT,
          cardno: entry.CARDNO,
        };
        this.timeEntryRepository.create(newEntry);
        // update the hashmap with that same entry
        openTransactionMap.set(entry.CARDNO, newEntry);
      }
    });
    this.logger.debug(
      `After parsing there are ${openTransactionMap.size} open transactions left over`,
    );
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
