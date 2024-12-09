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
    let data = await this.timeEntryRepository.find();

    let prepared = [];
    data.forEach((entry) => {
      prepared.push({ data: entry });
    });
    return data;
  }

  onModuleInit() {
    // this.dummydata.forEach((entry) => {
    //   this.timeEntryRepository.insert(entry.data);
    // });
  }

  private readonly dummydata: { data: TimeEntry }[] = [
    {
      data: {
        name: 'c313daad-9162-495c-9909-91ea18fb9d9a',
        intime: new Date('2014-08-01T04:50:27'),
        outtime: new Date('2024-10-24T07:21:33'),
        indevice: 'aliquip',
        outdevice: 'labore',
      },
    },
    {
      data: {
        name: 'e7993755-1807-401e-a05f-48eb8334202e',
        intime: new Date('2014-07-24T06:32:34'),
        outtime: new Date('2020-10-08T11:24:02'),
        indevice: 'aute',
        outdevice: 'Lorem',
      },
    },
    {
      data: {
        name: 'e7b3fb69-5fb1-4b92-9657-3507c38d24f7',
        intime: new Date('2014-08-18T11:48:50'),
        outtime: new Date('2023-07-05T07:07:51'),
        indevice: 'magna',
        outdevice: 'culpa',
      },
    },
    {
      data: {
        name: '34e49bc1-5a14-4a53-a95b-553d4aae5c62',
        intime: new Date('2014-02-10T05:11:03'),
        outtime: new Date('2021-01-08T01:24:47'),
        indevice: 'sit',
        outdevice: 'ullamco',
      },
    },
    {
      data: {
        name: '0d992cec-c71f-4f04-bf03-639abcb0fe55',
        intime: new Date('2014-06-26T05:23:22'),
        outtime: new Date('2022-05-02T08:40:03'),
        indevice: 'mollit',
        outdevice: 'quis',
      },
    },
    {
      data: {
        name: '7ff33715-5339-4b64-b496-b0f48e376bba',
        intime: new Date('2014-07-01T03:44:50'),
        outtime: new Date('2024-07-14T05:25:01'),
        indevice: 'Lorem',
        outdevice: 'cupidatat',
      },
    },
    {
      data: {
        name: '5554eaab-5996-457f-bfc7-e4f2113ab9d6',
        intime: new Date('2014-09-22T12:23:35'),
        outtime: new Date('2023-02-20T02:02:35'),
        indevice: 'et',
        outdevice: 'nostrud',
      },
    },
    {
      data: {
        name: 'afaa350c-fb06-4e6d-bed8-9d9c4f003360',
        intime: new Date('2014-12-03T10:59:36'),
        outtime: new Date('2019-12-16T12:43:01'),
        indevice: 'cillum',
        outdevice: 'fugiat',
      },
    },
    {
      data: {
        name: 'a0c8c445-ca21-419f-ab58-153d15f201c2',
        intime: new Date('2014-06-25T06:26:08'),
        outtime: new Date('2021-01-29T07:02:28'),
        indevice: 'anim',
        outdevice: 'velit',
      },
    },
    {
      data: {
        name: 'fe77078a-0ef4-4b27-b241-b458475031b4',
        intime: new Date('2014-01-13T09:52:58'),
        outtime: new Date('2017-05-01T02:12:39'),
        indevice: 'reprehenderit',
        outdevice: 'anim',
      },
    },
    {
      data: {
        name: 'b0c5707f-fc3d-4bac-95d8-ad81a0f9202b',
        intime: new Date('2014-10-15T10:12:27'),
        outtime: new Date('2019-05-27T02:38:30'),
        indevice: 'veniam',
        outdevice: 'ullamco',
      },
    },
    {
      data: {
        name: 'aae25279-3f16-4493-9776-9f8c767187ce',
        intime: new Date('2014-12-04T09:25:40'),
        outtime: new Date('2022-03-23T08:43:54'),
        indevice: 'proident',
        outdevice: 'anim',
      },
    },
    {
      data: {
        name: '0bd66c76-23f3-4ac8-bfa2-e133ba259f90',
        intime: new Date('2014-08-27T03:13:49'),
        outtime: new Date('2018-09-21T01:16:06'),
        indevice: 'mollit',
        outdevice: 'nulla',
      },
    },
    {
      data: {
        name: '7b26e384-70b7-4c9a-965e-6e8b99eebe0b',
        intime: new Date('2014-04-10T05:26:11'),
        outtime: new Date('2023-10-28T08:45:34'),
        indevice: 'duis',
        outdevice: 'excepteur',
      },
    },
    {
      data: {
        name: 'e462eb45-81f5-43f3-8584-d6dcf10d921f',
        intime: new Date('2014-06-16T02:47:26'),
        outtime: new Date('2020-08-21T05:40:41'),
        indevice: 'sunt',
        outdevice: 'irure',
      },
    },
    {
      data: {
        name: '3e6f89ae-1b54-4f81-99fd-316a4b660b8b',
        intime: new Date('2014-09-12T11:13:07'),
        outtime: new Date('2018-04-08T09:27:39'),
        indevice: 'dolor',
        outdevice: 'fugiat',
      },
    },
    {
      data: {
        name: '7ba4eddc-9ccc-4691-a96b-92d1f4ed4b0b',
        intime: new Date('2014-02-04T06:12:55'),
        outtime: new Date('2024-06-04T06:09:59'),
        indevice: 'sint',
        outdevice: 'commodo',
      },
    },
    {
      data: {
        name: 'e7426ab3-827d-4202-b47b-d1e35a6805ee',
        intime: new Date('2014-03-02T03:39:36'),
        outtime: new Date('2023-04-29T12:43:39'),
        indevice: 'laborum',
        outdevice: 'tempor',
      },
    },
    {
      data: {
        name: '4035d23e-2a5c-4005-ab09-eb4c02c2cd49',
        intime: new Date('2014-12-09T12:34:43'),
        outtime: new Date('2023-01-27T07:40:26'),
        indevice: 'adipisicing',
        outdevice: 'in',
      },
    },
    {
      data: {
        name: '6ac9bba2-4806-47a7-825a-48f2e16a012a',
        intime: new Date('2014-09-22T06:37:59'),
        outtime: new Date('2020-06-12T05:52:33'),
        indevice: 'consequat',
        outdevice: 'ea',
      },
    },
    {
      data: {
        name: '9fb8da80-4037-4ec2-8b61-2bb060ddf701',
        intime: new Date('2014-12-21T01:54:06'),
        outtime: new Date('2020-07-04T06:38:27'),
        indevice: 'occaecat',
        outdevice: 'eiusmod',
      },
    },
    {
      data: {
        name: '056cd089-bd3a-48b7-8275-9af9b90dc3c0',
        intime: new Date('2014-08-07T11:57:00'),
        outtime: new Date('2021-06-27T02:15:23'),
        indevice: 'adipisicing',
        outdevice: 'in',
      },
    },
    {
      data: {
        name: '61f50e84-5aff-4faa-82ad-f005f9e2539a',
        intime: new Date('2014-07-10T12:01:58'),
        outtime: new Date('2018-05-23T07:09:26'),
        indevice: 'duis',
        outdevice: 'fugiat',
      },
    },
    {
      data: {
        name: '7f0bc42c-9cac-47ef-806c-fd57701531cc',
        intime: new Date('2014-10-27T04:39:18'),
        outtime: new Date('2020-05-24T05:16:15'),
        indevice: 'nisi',
        outdevice: 'consectetur',
      },
    },
    {
      data: {
        name: '94709f2b-0816-4b0f-b8d2-8d9b4504f56d',
        intime: new Date('2014-10-11T03:23:14'),
        outtime: new Date('2023-01-22T12:41:55'),
        indevice: 'voluptate',
        outdevice: 'incididunt',
      },
    },
    {
      data: {
        name: '97368fd8-9448-462e-b43f-afa24c441265',
        intime: new Date('2014-01-23T05:47:12'),
        outtime: new Date('2018-07-21T01:06:22'),
        indevice: 'aute',
        outdevice: 'culpa',
      },
    },
    {
      data: {
        name: '2ef5ea4c-8f9f-429c-af44-ab23fba49cd4',
        intime: new Date('2014-08-14T08:16:06'),
        outtime: new Date('2020-09-19T06:25:41'),
        indevice: 'elit',
        outdevice: 'et',
      },
    },
    {
      data: {
        name: 'ed8d0e8d-e691-4212-a864-45dee3007943',
        intime: new Date('2014-06-29T10:25:57'),
        outtime: new Date('2020-09-05T02:41:32'),
        indevice: 'ullamco',
        outdevice: 'mollit',
      },
    },
    {
      data: {
        name: 'c7d27e30-e630-492f-8536-926e8f934639',
        intime: new Date('2014-04-27T08:55:30'),
        outtime: new Date('2020-01-06T07:49:33'),
        indevice: 'quis',
        outdevice: 'laboris',
      },
    },
    {
      data: {
        name: 'cf9be765-49d2-4b55-8a54-78a86aa17741',
        intime: new Date('2014-12-12T08:43:38'),
        outtime: new Date('2021-05-01T12:17:29'),
        indevice: 'amet',
        outdevice: 'sunt',
      },
    },
  ];
}
