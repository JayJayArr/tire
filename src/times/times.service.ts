import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeEntry } from 'src/entities/timeentry.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class TimesService {
  constructor(
    @InjectRepository(TimeEntry, 'TireConnection')
    private timeEntryRepository: Repository<TimeEntry>,
  ) { }

  async gettimes(cardno: string, start?: Date, end?: Date) {
    if (start && end) {
      start = new Date(start);
      end = new Date(end);
      start = new Date(
        Date.UTC(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes(),
          start.getSeconds(),
          start.getMilliseconds(),
        ),
      );
      end = new Date(
        Date.UTC(
          end.getFullYear(),
          end.getMonth(),
          end.getDate(),
          end.getHours(),
          end.getMinutes(),
          end.getSeconds(),
          end.getMilliseconds(),
        ),
      );
      return await this.timeEntryRepository.findBy({
        cardno,
        intime: Between(start, end),
      });
    } else {
      return await this.timeEntryRepository.findBy({ cardno });
    }
  }

  async createTimeEntry(timeentry: TimeEntry) {
    timeentry.intime = new Date(timeentry.intime);
    timeentry.intime = new Date(
      Date.UTC(
        timeentry.intime.getFullYear(),
        timeentry.intime.getMonth(),
        timeentry.intime.getDate(),
        timeentry.intime.getHours(),
        timeentry.intime.getMinutes(),
        timeentry.intime.getSeconds(),
        timeentry.intime.getMilliseconds(),
      ),
    );
    if (timeentry.outtime) {
      timeentry.outtime = new Date(timeentry.outtime);
      timeentry.outtime = new Date(
        Date.UTC(
          timeentry.outtime.getFullYear(),
          timeentry.outtime.getMonth(),
          timeentry.outtime.getDate(),
          timeentry.outtime.getHours(),
          timeentry.outtime.getMinutes(),
          timeentry.outtime.getSeconds(),
          timeentry.outtime.getMilliseconds(),
        ),
      );
    }
    return await this.timeEntryRepository.insert(timeentry);
  }

  async updatetime(timeentry: TimeEntry) {
    return await this.timeEntryRepository.save(timeentry);
  }
}
