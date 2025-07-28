import { Test, TestingModule } from '@nestjs/testing';
import {
  getDataSourceToken,
  getEntityManagerToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { TimeEntry } from '../entities/timeentry.entity';
import { Connector } from '../entities/connector.entity';
import { Reader } from '../entities/reader.entity';
import { User } from '../entities/user.entity';
import { Role } from '../types';
import { Logger } from '@nestjs/common';
import { ProWatchWorker } from './pro-watch.worker';

describe('ProWatchService', () => {
  let worker: ProWatchWorker;
  let mockTimeEntryRepository = {
    findBy: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
  };

  let mockUsersRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(users),
    })),
  };

  let mockDataSource = {
    createQueryRunner: jest.fn(() => ({})),
  };

  let mockReaderRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(readers),
    })),
  };

  let mockConnectorRepository = {
    findOneBy: jest.fn(),
    insert: jest.fn(),
    save: jest.fn(),
  };

  let mockPwEntityManager = {
    query: jest.fn(),
  };

  let logEntries = [
    {
      EVNT_DAT: new Date(),
      REC_DAT: new Date(),
      CARDNO: '69420',
      LOGDEVDESCRP: 'Cool Reader',
    },
    {
      EVNT_DAT: new Date(),
      REC_DAT: new Date(),
      CARDNO: '4827490',
      LOGDEVDESCRP: 'Another cool Reader',
    },
    {
      EVNT_DAT: new Date(),
      REC_DAT: new Date(),
      CARDNO: '028402849',
      LOGDEVDESCRP: 'a Third cool Reader?',
    },
  ];

  let users = [
    {
      id: 1,
      email: 'admin@admin.com',
      password: 'admin',
      cardno: '0000',
      roles: [Role.User, Role.PowerUser, Role.Admin],
      active: true,
    },
    {
      id: 1234,
      email: 'jakob.rietdorf@nutz.com',
      password: 'admin',
      cardno: '69420',
      roles: [Role.User, Role.PowerUser, Role.Admin],
      active: true,
    },
  ] as User[];

  const connectors = [
    {
      id: 1,
      name: 'ProWatch',
      timestamp: new Date(),
      active: true,
    },
    {
      id: 1234,
      name: 'OnGuard',
      timestamp: new Date(),
      active: false,
    },
  ] as Connector[];

  const readers = [
    {
      id: new Buffer('69420'),
      name: 'abcdefghijklmnipqrstuvwxyz',
      active: true,
    },
  ] as Reader[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProWatchWorker,
        {
          provide: getRepositoryToken(TimeEntry, 'TireConnection'),
          useValue: mockTimeEntryRepository,
        },
        {
          provide: getRepositoryToken(Connector, 'TireConnection'),
          useValue: mockConnectorRepository,
        },
        {
          provide: getRepositoryToken(User, 'TireConnection'),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Reader, 'TireConnection'),
          useValue: mockReaderRepository,
        },
        {
          provide: getEntityManagerToken('ProWatchConnection'),
          useValue: mockPwEntityManager,
        },
        {
          provide: getDataSourceToken('TireConnection'),
          useValue: mockDataSource,
        },
      ],
    }).compile();

    worker = module.get<ProWatchWorker>(ProWatchWorker);
  });

  it('should be defined', () => {
    expect(worker).toBeDefined();
  });

  it('proWatchPuller => should abort on a deactivated connector', async () => {
    jest.spyOn(mockPwEntityManager, 'query').mockResolvedValue(logEntries);
    jest
      .spyOn(mockConnectorRepository, 'findOneBy')
      .mockResolvedValue(connectors[1]);
    jest.spyOn(Logger, 'log');
    jest.spyOn(mockTimeEntryRepository, 'findBy').mockResolvedValue(logEntries);
    jest.spyOn(mockTimeEntryRepository, 'update').mockReturnThis();
    jest.spyOn(mockTimeEntryRepository, 'insert').mockReturnThis();

    let result = await worker.proWatchPuller();

    expect(result).toBe(0);
    expect(mockConnectorRepository.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('proWatchPuller => should abort on no users', async () => {
    jest.spyOn(mockPwEntityManager, 'query').mockResolvedValue(logEntries);
    jest.spyOn(mockUsersRepository, 'createQueryBuilder').mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    });
    jest
      .spyOn(mockConnectorRepository, 'findOneBy')
      .mockReturnValue(connectors[0]);
    jest.spyOn(mockConnectorRepository, 'insert').mockReturnThis();
    jest.spyOn(Logger, 'log');
    jest.spyOn(mockTimeEntryRepository, 'findBy').mockResolvedValue(logEntries);
    jest.spyOn(mockTimeEntryRepository, 'update').mockReturnThis();
    jest.spyOn(mockTimeEntryRepository, 'insert').mockReturnThis();

    let result = await worker.proWatchPuller();

    expect(result).toBe(0);
    expect(mockConnectorRepository.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('proWatchPuller => should abort on no readers', async () => {
    jest.spyOn(mockPwEntityManager, 'query').mockResolvedValue(logEntries);
    jest.spyOn(mockReaderRepository, 'createQueryBuilder').mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    });
    jest
      .spyOn(mockConnectorRepository, 'findOneBy')
      .mockReturnValue(connectors[0]);
    jest.spyOn(mockConnectorRepository, 'insert').mockReturnThis();
    jest.spyOn(Logger, 'log');
    jest.spyOn(mockTimeEntryRepository, 'findBy').mockResolvedValue(logEntries);
    jest.spyOn(mockTimeEntryRepository, 'update').mockReturnThis();
    jest.spyOn(mockTimeEntryRepository, 'insert').mockReturnThis();

    let result = await worker.proWatchPuller();

    expect(result).toBe(0);
    expect(mockConnectorRepository.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockPwEntityManager.query).toHaveBeenCalledTimes(0);
  });
});
