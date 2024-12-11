import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeEntry } from 'src/entities/timeentry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimesService implements OnModuleInit {
  constructor(
    @InjectRepository(TimeEntry)
    private timeEntryRepository: Repository<TimeEntry>,
  ) {}
  async gettimes(cardno: string) {
    return await this.timeEntryRepository.findBy({ cardno });
  }

  onModuleInit() {
    // this.dummydata.forEach((entry) => {
    //   this.timeEntryRepository.insert(entry.data);
    // });
  }

  private readonly dummydata: { data: TimeEntry }[] = [
    {
      data: {
        intime: new Date('2014-08-01T04:50:27'),
        outtime: new Date('2024-10-24T07:21:33'),
        indevice: 'aliquip',
        outdevice: 'labore',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-07-24T06:32:34'),
        outtime: new Date('2020-10-08T11:24:02'),
        indevice: 'aute',
        outdevice: 'Lorem',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-08-18T11:48:50'),
        outtime: new Date('2023-07-05T07:07:51'),
        indevice: 'magna',
        outdevice: 'culpa',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-02-10T05:11:03'),
        outtime: new Date('2021-01-08T01:24:47'),
        indevice: 'sit',
        outdevice: 'ullamco',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-06-26T05:23:22'),
        outtime: new Date('2022-05-02T08:40:03'),
        indevice: 'mollit',
        outdevice: 'quis',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-07-01T03:44:50'),
        outtime: new Date('2024-07-14T05:25:01'),
        indevice: 'Lorem',
        outdevice: 'cupidatat',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-09-22T12:23:35'),
        outtime: new Date('2023-02-20T02:02:35'),
        indevice: 'et',
        outdevice: 'nostrud',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-12-03T10:59:36'),
        outtime: new Date('2019-12-16T12:43:01'),
        indevice: 'cillum',
        outdevice: 'fugiat',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-06-25T06:26:08'),
        outtime: new Date('2021-01-29T07:02:28'),
        indevice: 'anim',
        outdevice: 'velit',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-01-13T09:52:58'),
        outtime: new Date('2017-05-01T02:12:39'),
        indevice: 'reprehenderit',
        outdevice: 'anim',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-10-15T10:12:27'),
        outtime: new Date('2019-05-27T02:38:30'),
        indevice: 'veniam',
        outdevice: 'ullamco',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-12-04T09:25:40'),
        outtime: new Date('2022-03-23T08:43:54'),
        indevice: 'proident',
        outdevice: 'anim',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-08-27T03:13:49'),
        outtime: new Date('2018-09-21T01:16:06'),
        indevice: 'mollit',
        outdevice: 'nulla',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-04-10T05:26:11'),
        outtime: new Date('2023-10-28T08:45:34'),
        indevice: 'duis',
        outdevice: 'excepteur',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-06-16T02:47:26'),
        outtime: new Date('2020-08-21T05:40:41'),
        indevice: 'sunt',
        outdevice: 'irure',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-09-12T11:13:07'),
        outtime: new Date('2018-04-08T09:27:39'),
        indevice: 'dolor',
        outdevice: 'fugiat',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-02-04T06:12:55'),
        outtime: new Date('2024-06-04T06:09:59'),
        indevice: 'sint',
        outdevice: 'commodo',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-03-02T03:39:36'),
        outtime: new Date('2023-04-29T12:43:39'),
        indevice: 'laborum',
        outdevice: 'tempor',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-12-09T12:34:43'),
        outtime: new Date('2023-01-27T07:40:26'),
        indevice: 'adipisicing',
        outdevice: 'in',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-09-22T06:37:59'),
        outtime: new Date('2020-06-12T05:52:33'),
        indevice: 'consequat',
        outdevice: 'ea',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-12-21T01:54:06'),
        outtime: new Date('2020-07-04T06:38:27'),
        indevice: 'occaecat',
        outdevice: 'eiusmod',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-08-07T11:57:00'),
        outtime: new Date('2021-06-27T02:15:23'),
        indevice: 'adipisicing',
        outdevice: 'in',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-07-10T12:01:58'),
        outtime: new Date('2018-05-23T07:09:26'),
        indevice: 'duis',
        outdevice: 'fugiat',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-10-27T04:39:18'),
        outtime: new Date('2020-05-24T05:16:15'),
        indevice: 'nisi',
        outdevice: 'consectetur',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-10-11T03:23:14'),
        outtime: new Date('2023-01-22T12:41:55'),
        indevice: 'voluptate',
        outdevice: 'incididunt',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-01-23T05:47:12'),
        outtime: new Date('2018-07-21T01:06:22'),
        indevice: 'aute',
        outdevice: 'culpa',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-08-14T08:16:06'),
        outtime: new Date('2020-09-19T06:25:41'),
        indevice: 'elit',
        outdevice: 'et',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-06-29T10:25:57'),
        outtime: new Date('2020-09-05T02:41:32'),
        indevice: 'ullamco',
        outdevice: 'mollit',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-04-27T08:55:30'),
        outtime: new Date('2020-01-06T07:49:33'),
        indevice: 'quis',
        outdevice: 'laboris',
        cardno: '10490',
      },
    },
    {
      data: {
        intime: new Date('2014-12-12T08:43:38'),
        outtime: new Date('2021-05-01T12:17:29'),
        indevice: 'amet',
        outdevice: 'sunt',
        cardno: '10490',
      },
    },
  ];
}
