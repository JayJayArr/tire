import { Test, TestingModule } from '@nestjs/testing';
import { ReaderService } from './reader.service';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { Reader } from '../entities/reader.entity';

describe('ReaderService', () => {
  let service: ReaderService;
  const mockReaderRepository = {
    find: jest.fn(),
    save: jest.fn(),
  };
  let mockPwEntityManager = {
    query: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReaderService,
        {
          provide: getRepositoryToken(Reader, 'TireConnection'),
          useValue: mockReaderRepository,
        },
        {
          provide: getEntityManagerToken('ProWatchConnection'),
          useValue: mockPwEntityManager,
        },
      ],
    }).compile();

    service = module.get<ReaderService>(ReaderService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getReaders => should get all readers and return them', async () => {
    const readers = [
      {
        id: new Buffer('1234567890'),
        name: 'abcdefghijklmnipqrstuvwxyz',
        active: true,
      },
    ] as Reader[];
    jest.spyOn(mockReaderRepository, 'find').mockReturnValue(readers);

    const result = await service.getReaders();

    expect(result).toEqual(readers);
    expect(mockReaderRepository.find).toHaveBeenCalled();
  });

  it('putReader => should update a Reader and return it', async () => {
    const reader = {
      id: new Buffer('asdf'),
      name: 'abcdefghijklmnipqrstuvwxyz',
      active: true,
    } as Reader;
    jest.spyOn(mockReaderRepository, 'save').mockReturnValue(reader);

    const result = await service.updateReader(reader);

    expect(result).toEqual(reader);
    expect(mockReaderRepository.save).toHaveBeenCalled();
  });

  it('pullfromProWatch => should start a pull from access control ProWatch', async () => {
    jest.enableAutomock();
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
    jest.spyOn(mockPwEntityManager, 'query').mockResolvedValue(readers);

    const result = await service.pullFromProWatch();

    expect(result).toBe(2);
    expect(mockPwEntityManager.query).toHaveBeenCalledTimes(1);
    expect(mockReaderRepository.save).toHaveBeenCalledTimes(2);
  });
});
