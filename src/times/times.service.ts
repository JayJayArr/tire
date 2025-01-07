import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeEntry } from 'src/entities/timeentry.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class TimesService {
  constructor(
    @InjectRepository(TimeEntry, 'TireConnection')
    private timeEntryRepository: Repository<TimeEntry>,
  ) {}

  async gettimes(cardno: string, start?: Date, end?: Date) {
    if (start && end) {
      return await this.timeEntryRepository.findBy({
        cardno,
        intime: Between(start, end),
      });
    } else {
      return await this.timeEntryRepository.findBy({ cardno });
    }
  }

  async updatetime(timeentry: TimeEntry) {
    return await this.timeEntryRepository.save(timeentry);
  }
}
