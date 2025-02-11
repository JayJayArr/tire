import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from '../types';
import { User } from '../entities/user.entity';
import { SignUpDto } from '../pipes/signUpDto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    pullFromProWatch: jest.fn(),
    verifyPassword: jest.fn(),
    hashPassword: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
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

  let signUpUser = {
    email: 'jakob.rietdorf@nutz.com',
    password: 'admin',
    confirmPassword: 'admin',
  } as SignUpDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'TestKey',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUserService },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signIn => should login a user and return a jwt', async () => {
    jest.spyOn(mockUserService, 'findOne').mockReturnValue(users);
    jest.spyOn(mockUserService, 'verifyPassword').mockResolvedValue(true);
    jest.spyOn(mockJwtService, 'signAsync').mockResolvedValue('signintoken');

    let result = await service.signIn(users[0].email, users[0].password);

    expect(result).toEqual({
      data: {
        token: 'signintoken',
      },
    });
    expect(mockJwtService.signAsync).toHaveBeenCalledTimes(1);
    expect(mockUserService.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserService.verifyPassword).toHaveBeenCalledTimes(1);
  });

  it('signIn => should throw if the password is not verified', async () => {
    jest.spyOn(mockUserService, 'findOne').mockReturnValue(users);
    jest.spyOn(mockUserService, 'verifyPassword').mockResolvedValue(false);
    jest.spyOn(mockJwtService, 'signAsync').mockResolvedValue('signintoken');

    expect(async () => {
      await service.signIn(users[0].email, users[0].password);
    }).rejects.toThrow();
    expect(mockUserService.findOne).toHaveBeenCalledTimes(1);
  });

  it('signUp => should create a user and return a jwt', async () => {
    jest.spyOn(mockUserService, 'hashPassword').mockReturnValue('passwordhash');
    jest.spyOn(mockUserService, 'updateUser').mockResolvedValue(users[0]);
    jest.spyOn(mockUserService, 'findOne').mockReturnValue(undefined);
    jest.spyOn(mockJwtService, 'signAsync').mockResolvedValue('signuptoken');

    let result = await service.signUp(signUpUser);

    expect(result).toEqual({
      data: {
        token: 'signuptoken',
      },
    });
    expect(mockUserService.hashPassword).toHaveBeenCalledTimes(1);
    expect(mockUserService.updateUser).toHaveBeenCalledTimes(1);
    expect(mockUserService.findOne).toHaveBeenCalledTimes(1);
    expect(mockJwtService.signAsync).toHaveBeenCalledTimes(1);
  });

  it('signUp => should throw if the user already exists', async () => {
    jest.spyOn(mockUserService, 'hashPassword').mockReturnValue('passwordhash');
    jest.spyOn(mockUserService, 'updateUser').mockResolvedValue(users[0]);
    jest.spyOn(mockUserService, 'findOne').mockReturnValue(users[0]);
    jest.spyOn(mockJwtService, 'signAsync').mockResolvedValue('signuptoken');

    expect(async () => {
      await service.signUp(signUpUser);
    }).rejects.toThrow();
    expect(mockUserService.hashPassword).toHaveBeenCalledTimes(1);
  });

  it('changePassword => should update a users password', async () => {
    jest.spyOn(mockUserService, 'findOne').mockReturnValue(users[0]);
    jest.spyOn(mockUserService, 'updateUser').mockResolvedValue(users[0]);

    let result = await service.changePassword(
      users[0].email,
      users[0].password,
    );

    expect(result).toBe(users[0]);
    expect(mockUserService.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserService.updateUser).toHaveBeenCalledTimes(1);
    expect(mockUserService.hashPassword).toHaveBeenCalledTimes(1);
  });

  it('resetPassword => should reset a password to a users cardno', async () => {
    jest.spyOn(mockUserService, 'findOne').mockReturnValue(users[0]);
    jest.spyOn(mockUserService, 'updateUser').mockResolvedValue(users[0]);

    let result = await service.resetPassword(users[0].password);

    expect(result).toBe(users[0]);
    expect(mockUserService.findOne).toHaveBeenCalledTimes(1);
    expect(mockUserService.updateUser).toHaveBeenCalledTimes(1);
    expect(mockUserService.hashPassword).toHaveBeenCalledTimes(1);
  });
});
