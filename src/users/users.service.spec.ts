import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../types';

describe('UsersService', () => {
  let service: UsersService;
  const mockUserRepository = {
    findOneBy: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };
  let mockPwEntityManager = {
    query: jest.fn(),
  };
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User, 'TireConnection'),
          useValue: mockUserRepository,
        },
        {
          provide: getEntityManagerToken('ProWatchConnection'),
          useValue: mockPwEntityManager,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne => should find an active user based on the email', async () => {
    jest.spyOn(mockUserRepository, 'findOneBy').mockReturnValue(users[1]);
    let result = await service.findOne(users[1].email);

    expect(result).toEqual(users[1]);
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
      email: users[1].email,
      active: true,
    });
  });
  it('findAll', async () => {
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);
    let result = await service.findAll();

    expect(result).toEqual(users);
    expect(mockUserRepository.find).toHaveBeenCalledWith();
  });
  it('updateUser', async () => {
    jest.spyOn(mockUserRepository, 'save').mockReturnValue(users[1]);
    let result = await service.updateUser(users[1]);

    expect(result).toBe(users[1]);
    expect(mockUserRepository.save).toHaveBeenCalledWith(users[1]);
  });
  it('deleteUser', async () => {
    jest.spyOn(mockUserRepository, 'delete').mockReturnValue(users[1]);
    let result = await service.deleteUser(users[1].id);

    expect(result).toBe(users[1]);
    expect(mockUserRepository.delete).toHaveBeenCalledWith(users[1].id);
  });
  it('pullFromProwatch', async () => {
    jest.spyOn(mockPwEntityManager, 'query').mockResolvedValue(users);

    const result = await service.pullFromProWatch();

    expect(result).toBe(2);
    expect(mockPwEntityManager.query).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.update).toHaveBeenCalledTimes(2);
  });
});
