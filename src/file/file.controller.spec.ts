import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { CanActivate, StreamableFile } from '@nestjs/common';
import { TimeEntry } from '../entities/timeentry.entity';
import { AuthGuard } from '../auth/auth.guard';
import { TimesService } from '../times/times.service';

describe('FileController', () => {
  let controller: FileController;
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
      controllers: [FileController],
      providers: [{ provide: TimesService, useValue: mockTimesService }],
    })

      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getPersonalTimesFile => should return the timeentries for a person', async () => {
    jest.spyOn(mockTimesService, 'getTimeEntries').mockReturnValue(timeEntries);
    let result = await controller.getPersonalTimes(cardno, { start, end });
    expect(result).toBeTruthy();
    expect(mockTimesService.getTimeEntries).toHaveBeenCalledWith(
      cardno,
      start,
      end,
    );
  });

  it('getOverviewTimesFile => should return the timeentries for a person', async () => {
    jest.spyOn(mockTimesService, 'getTimeEntries').mockReturnValue(timeEntries);
    let result = await controller.getOverviewTimes({ cardno }, { start, end });
    expect(result).toBeTruthy();
    expect(mockTimesService.getTimeEntries).toHaveBeenCalledWith(
      cardno,
      start,
      end,
    );
  });

  it('getPersonalTimesFile => should return a file', async () => {
    jest.spyOn(mockTimesService, 'getTimeEntries').mockReturnValue(timeEntries);
    let result = await controller.getPersonalTimes(cardno, { start, end });
    expect(result).toBeInstanceOf(StreamableFile);
  });

  it('getOverviewTimesFile => should return a file', async () => {
    jest.spyOn(mockTimesService, 'getTimeEntries').mockReturnValue(timeEntries);
    let result = await controller.getOverviewTimes({ cardno }, { start, end });
    expect(result).toBeInstanceOf(StreamableFile);
  });
});
