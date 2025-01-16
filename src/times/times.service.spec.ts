import { Test, TestingModule } from '@nestjs/testing';
import { TimesService } from './times.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TimeEntry } from '../entities/timeentry.entity';
import { Between } from 'typeorm';

describe('TimesService', () => {
  let service: TimesService;
  const mockTimeEntryRepository = {
    find: jest.fn(),
    save: jest.fn(),
    findBy: jest.fn(),
    insert: jest.fn(),
  };
  const timeEntries = [
    {
      id: 1,
      indevice: 'Cool Reader',
      intime: new Date(),
      cardno: '69420',
      faulty: false,
    },
    {
      id: 384729,
      indevice: 'Cool Reader',
      intime: new Date(),
      outdevice: 'Cool Reader',
      outtime: new Date(),
      faulty: false,
      cardno: '69420',
    },
    {
      id: 1234,
      indevice: 'Cool Reader',
      intime: new Date(),
      faulty: true,
      cardno: '69420',
    },
  ] as TimeEntry[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimesService,
        {
          provide: getRepositoryToken(TimeEntry, 'TireConnection'),
          useValue: mockTimeEntryRepository,
        },
      ],
    }).compile();

    service = module.get<TimesService>(TimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getTimeEntries => should get all TimeEntries', async () => {
    const cardno = '69420';
    jest.spyOn(mockTimeEntryRepository, 'findBy').mockReturnValue(timeEntries);

    let result = await service.getTimeEntries(cardno);

    expect(result).toBe(timeEntries);
    expect(mockTimeEntryRepository.findBy).toHaveBeenCalledWith({
      cardno: cardno,
    });
  });

  it('getTimeEntries => should get all TimeEntries within a timeslot', async () => {
    let end = new Date();
    let start = new Date();
    const cardno = '69420';
    jest.spyOn(mockTimeEntryRepository, 'findBy').mockReturnValue([]);

    let result = await service.getTimeEntries(cardno, start, end);

    expect(result).toEqual([]);
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
    expect(mockTimeEntryRepository.findBy).toHaveBeenCalledWith({
      cardno: cardno,
      intime: Between(start, end),
    });
  });

  it('createTimeEntry => should create a timeentry and return it', async () => {
    const timeentry = timeEntries[1];
    jest.spyOn(mockTimeEntryRepository, 'insert').mockReturnValue(timeentry);
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

    let result = await service.createTimeEntry(timeentry);

    expect(result).toEqual(timeentry);
    expect(mockTimeEntryRepository.insert).toHaveBeenCalled();
  });

  it('updateTimeEntry => should update a timeentry', async () => {
    const timeentry = timeEntries[1];

    jest.spyOn(mockTimeEntryRepository, 'save').mockReturnValue(timeentry);
    let result = await service.updateTimeEntry(timeentry);
    expect(result).toBe(timeentry);
    expect(mockTimeEntryRepository.save).toHaveBeenCalledWith(timeentry);
  });
});
