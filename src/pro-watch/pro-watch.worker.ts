import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Connector } from '../entities/connector.entity';
import { Reader } from '../entities/reader.entity';
import { TimeEntry } from '../entities/timeentry.entity';
import { User } from '../entities/user.entity';
import { EntityManager, IsNull, Repository } from 'typeorm';

@Injectable()
export class ProWatchWorker {
  constructor(
    @InjectRepository(Connector, 'TireConnection')
    private connectorRepository: Repository<Connector>,
    @InjectRepository(User, 'TireConnection')
    private usersRepository: Repository<User>,
    @InjectRepository(TimeEntry, 'TireConnection')
    private timeEntryRepository: Repository<TimeEntry>,
    @InjectRepository(Reader, 'TireConnection')
    private readerRepository: Repository<Reader>,
    @InjectEntityManager('ProWatchConnection')
    private pwEntityManager: EntityManager,
  ) {}
  private readonly logger = new Logger('ProWatch Worker');

  @Cron(CronExpression.EVERY_10_SECONDS)
  async proWatchPuller(): Promise<number> {
    this.logger.debug('starting connector pull');
    return new Promise(async (resolve, reject) => {
      let runbegin = new Date(); //Save the current time as a max date
      let connector = await this.connectorRepository.findOneBy({
        name: 'ProWatch',
      });

      if (!connector.active) {
        this.logger.log('Connector deactivated, aborting');
        resolve(0);
        return;
      }

      let usedCardnos = []; // get the cardnumbers of all active users out of the Repository
      await this.usersRepository
        .createQueryBuilder('user')
        .select('user.cardno')
        .where('user.active = 1')
        .andWhere('user.cardno is not null')
        .andWhere("user.cardno <> ''")
        .getMany()
        .then((result) => {
          result.forEach((row) => {
            usedCardnos.push(row.cardno);
          });
        });

      let activeReaders = []; // get the cardnumbers of all active users out of the Repository
      await this.readerRepository
        .createQueryBuilder('reader')
        .select('reader.id')
        .where('reader.active = 1')
        .getMany()
        .then((result) => {
          result.forEach((row) => {
            activeReaders.push(row.id);
          });
        });

      if (usedCardnos.length < 1 || activeReaders.length < 1) {
        this.logger.log('No cards or no readers available, aborting');
        resolve(0);
        return;
      }
      let prefix = '0x'; //needed for the correct ID creation of each Reader-ID

      let querystring = `SELECT TOP 2000 EVNT_DAT, REC_DAT, BADGE_C.CARDNO, LOGDEVDESCRP 
      FROM EV_LOG 
      INNER JOIN BADGE_C on EV_LOG.BADGENO = BADGE_C.ID
      WHERE EVNT_ADDR=500 
        AND ISNUMERIC(BADGE_C.CARDNO) = 1
        AND REC_DAT > CAST('${connector.timestamp.toISOString()}' as datetime) 
        AND REC_DAT <= CAST('${runbegin.toISOString()}' as datetime) 
        AND CAST(BADGE_C.CARDNO as bigint) IN (${usedCardnos.toString()})
        AND LOGDEVID IN (${activeReaders.map((element) => {
          return prefix.concat(element.toString('hex'));
        })})
        ORDER BY EVNT_DAT ASC`;
      const pwEvents = await this.pwEntityManager.query(querystring);
      let result: number = 0;
      if (!pwEvents.length) {
        resolve(result);
      } else {
        result = await this.parseEntries(pwEvents);
        //Update the timestamp in the DB
        let maxeventtimestamp = new Date(
          Math.max.apply(
            null,
            pwEvents.map(function (e) {
              return new Date(e.REC_DAT);
            }),
          ),
        );
        //convert the Date to UTC to ignore timezones
        maxeventtimestamp = new Date(
          Date.UTC(
            maxeventtimestamp.getFullYear(),
            maxeventtimestamp.getMonth(),
            maxeventtimestamp.getDate(),
            maxeventtimestamp.getHours(),
            maxeventtimestamp.getMinutes(),
            maxeventtimestamp.getSeconds(),
            maxeventtimestamp.getMilliseconds(),
          ),
        );
        connector.timestamp = maxeventtimestamp;
        await this.connectorRepository.save(connector);
      }
      resolve(result);
    });
  }

  async parseEntries(
    entries: { EVNT_DAT: Date; CARDNO: string; LOGDEVDESCRP: string }[],
  ): Promise<number> {
    return new Promise(async (resolve, reject) => {
      let openTransactionMap = new Map<string, TimeEntry>();
      this.logger.log(`Parsing ${entries.length} events`);
      ///getting open transactions from the db
      let openTransactions = await this.timeEntryRepository.findBy({
        outtime: IsNull(),
        faulty: false,
      });
      //put open transactions into the hashmap
      openTransactions.forEach((transaction) => {
        openTransactionMap.set(transaction.cardno, transaction);
      });
      this.logger.log(`${openTransactions.length} open transactions to match`);

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
            this.timeEntryRepository.update(
              { id: openTransaction.id },
              { faulty: true },
            );

            //create new transaction and save
            let newEntry: TimeEntry = {
              indevice: entry.LOGDEVDESCRP,
              intime: entry.EVNT_DAT,
              cardno: entry.CARDNO,
            };
            this.timeEntryRepository.insert(newEntry);
            //update Hashmap with new Entry
            openTransactionMap.set(entry.CARDNO, newEntry);
          } else {
            //complete the openTransaction
            openTransaction.outtime = entry.EVNT_DAT;
            openTransaction.outdevice = entry.LOGDEVDESCRP;
            //save the completed transaction to the db
            this.timeEntryRepository.update(
              { id: openTransaction.id },
              {
                outtime: entry.EVNT_DAT,
                outdevice: entry.LOGDEVDESCRP,
              },
            );
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
          this.timeEntryRepository.insert(newEntry);
          // update the hashmap with that same entry
          openTransactionMap.set(entry.CARDNO, newEntry);
        }
      });
      this.logger.log(`${openTransactionMap.size} transactions left open`);
      // openTransactionMap.forEach(async (value, key) => {
      //   this.timeEntryRepository.save(value);
      // });
      //
      resolve(entries.length);
    });
  }
}
