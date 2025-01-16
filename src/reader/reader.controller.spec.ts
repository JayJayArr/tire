import { Test, TestingModule } from '@nestjs/testing';
import { ReaderController } from './reader.controller';
import { AuthGuard } from '../auth/auth.guard';
import { ReaderService } from './reader.service';
import { CanActivate } from '@nestjs/common';
import { Reader } from '../entities/reader.entity';

describe('ReaderController', () => {
  let controller: ReaderController;
  let readerService: ReaderService;

  const mockReaderService = {
    getReaders: jest.fn(),
    updateReader: jest.fn(),
    pullFromProWatch: jest.fn(),
  };
  const mockAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReaderController],
      providers: [ReaderService],
    })
      .overrideProvider(ReaderService)
      .useValue(mockReaderService)
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    readerService = await module.resolve(ReaderService);
    controller = module.get<ReaderController>(ReaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getReaders => should return all readers', async () => {
    const readers = [
      {
        id: new Buffer('asdf'),
        DESCRP: 'YeetReader',
        INSTALLED: true,
      },
      {
        id: new Buffer('123456789'),
        DESCRP: 'Second Reader.&*/!@#$%^',
        INSTALLED: false,
      },
    ];

    jest.spyOn(mockReaderService, 'getReaders').mockReturnValue(readers);

    const result = await controller.getReaders();

    expect(result).toBe(readers);
    expect(mockReaderService.getReaders).toHaveBeenCalled();
  });

  it('updateReader => should update a Reader with the supplied id', async () => {
    const updateReader = {
      id: new Buffer('123456789'),
      name: 'Updated the Reader',
      active: true,
    } as Reader;

    jest.spyOn(mockReaderService, 'updateReader').mockReturnValue(updateReader);

    const result = await controller.updateReader(updateReader);

    expect(result).toBe(updateReader);
    expect(mockReaderService.updateReader).toHaveBeenCalled();
    expect(mockReaderService.updateReader).toHaveBeenCalledWith(updateReader);
  });

  it('syncUser => should start a sync from ProWatch and return the number of synced readers', async () => {
    jest.spyOn(mockReaderService, 'pullFromProWatch').mockReturnValue(2);

    const result = await controller.syncUsers();

    expect(result).toBe(2);
    expect(mockReaderService.pullFromProWatch).toHaveBeenCalled();
  });
});
