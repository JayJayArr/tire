import { Test, TestingModule } from '@nestjs/testing';
import { TimesController } from './times.controller';
import { AuthGuard } from '../auth/auth.guard';
import { CanActivate } from '@nestjs/common';
import { TimesService } from './times.service';
import { TimeEntry } from '../entities/timeentry.entity';

describe('TimesController', () => {
  let controller: TimesController;
  const mockAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };
  const mockTimesService = {
    getTimeEntries: jest.fn(),
    updateTimeEntry: jest.fn(),
    createTimeEntry: jest.fn(),
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
  let start = new Date();
  let end = new Date();
  let cardno = '69420';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesController],
      providers: [TimesService],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideProvider(TimesService)
      .useValue(mockTimesService)
      .compile();

    controller = module.get<TimesController>(TimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getPersonalTimes => should return the timeentries for a person', async () => {
    jest.spyOn(mockTimesService, 'getTimeEntries').mockReturnValue(timeEntries);
    let result = await controller.getPersonalTimes(cardno, { start, end });
    expect(result).toBe(timeEntries);
    expect(mockTimesService.getTimeEntries).toHaveBeenCalledWith(
      cardno,
      start,
      end,
    );
  });

  it('getOverviewTimes => should return the timeentries for a person', async () => {
    jest.spyOn(mockTimesService, 'getTimeEntries').mockReturnValue(timeEntries);
    let result = await controller.getPersonalTimes(cardno, { start, end });
    expect(result).toBe(timeEntries);
    expect(mockTimesService.getTimeEntries).toHaveBeenCalledWith(
      cardno,
      start,
      end,
    );
  });

  it('createTimeEntry => should create a timeentry and return it', async () => {
    jest
      .spyOn(mockTimesService, 'createTimeEntry')
      .mockReturnValue(timeEntries[1]);
    let result = await controller.createTimeEntry(timeEntries[1]);

    expect(result).toBe(timeEntries[1]);
    expect(mockTimesService.createTimeEntry).toHaveBeenCalledWith(
      timeEntries[1],
    );
  });

  it('updateTimeEntry => should update a timeentry and return it', async () => {
    jest
      .spyOn(mockTimesService, 'updateTimeEntry')
      .mockReturnValue(timeEntries[1]);
    let result = await controller.updateTimeEntry(timeEntries[1]);

    expect(result).toBe(timeEntries[1]);
    expect(mockTimesService.updateTimeEntry).toHaveBeenCalledWith(
      timeEntries[1],
    );
  });
});
