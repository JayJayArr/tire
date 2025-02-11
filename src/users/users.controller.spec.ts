import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { CanActivate } from '@nestjs/common';
import { Role } from '../types';
import { User } from '../entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
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

  const mockUserService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    pullFromProWatch: jest.fn(),
    createUser: jest.fn(),
  };
  const mockAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAvailableUsers => should return active Users', async () => {
    jest.spyOn(mockUserService, 'findAll').mockReturnValue(users);

    const result = await controller.getAvailableUsers();

    expect(result).toBe(users);
    expect(mockUserService.findAll).toHaveBeenCalledTimes(1);
  });

  it('updateUser => should update a User', async () => {
    jest.spyOn(mockUserService, 'updateUser').mockReturnValue(users[1]);

    const result = await controller.updateUser(users[1]);

    expect(result).toBe(users[1]);
    expect(mockUserService.updateUser).toHaveBeenCalledTimes(1);
    expect(mockUserService.updateUser).toHaveBeenCalledWith(users[1]);
  });

  it('createUser => should create active Users', async () => {
    jest.spyOn(mockUserService, 'createUser').mockReturnValue(users[1]);

    const result = await controller.createUser(users[1]);

    expect(mockUserService.updateUser).toHaveBeenCalledTimes(1);
  });

  it('deleteUser => should delete Users', async () => {
    jest.spyOn(mockUserService, 'deleteUser').mockReturnValue(users[1]);

    const result = await controller.deleteUser(users[1].id);

    expect(result).toBe(users[1]);
    expect(mockUserService.deleteUser).toHaveBeenCalledTimes(1);
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(users[1].id);
  });

  it('triggerProWatchUserPull => should return active Users', async () => {
    jest.spyOn(mockUserService, 'pullFromProWatch').mockReturnValue(2);

    const result = await controller.triggerProWatchUserPull();

    expect(result).toBe(2);
    expect(mockUserService.pullFromProWatch).toHaveBeenCalledTimes(1);
    expect(mockUserService.pullFromProWatch).toHaveBeenCalledWith();
  });
});
