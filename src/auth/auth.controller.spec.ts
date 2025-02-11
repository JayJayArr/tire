import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { CanActivate } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../pipes/signInDto';
import { SignUpDto } from '../pipes/signUpDto';
import { Role } from '../types';
import { User } from '../entities/user.entity';
import { ResetPassDto } from 'src/pipes/resetPassDto';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthGuard: CanActivate = {
    canActivate() {
      return true;
    },
  };
  let mockAuthService = {
    signIn: jest.fn(),
    signUp: jest.fn(),
    changePassword: jest.fn(),
    resetPassword: jest.fn(),
  };
  const response = {
    data: {
      token: 'signintoken',
    },
  };

  let signUpUser = {
    email: 'admin@admin.com',
    password: 'admin',
    confirmPassword: 'admin',
  } as SignUpDto;

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

  let signInUser = { email: 'admin@admin.com', password: 'admin' } as SignInDto;
  let resetUser = {
    confirmPassword: 'admin',
    password: 'admin',
  } as ResetPassDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })

      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signIn => should sign in and return a jwt', async () => {
    jest.spyOn(mockAuthService, 'signIn').mockResolvedValue(response);

    let result = await controller.signIn(signInUser);

    expect(mockAuthService.signIn).toHaveBeenCalledTimes(1);
    expect(result).toBe(response);
  });

  it('signUp => should sign up and return a jwt', async () => {
    jest.spyOn(mockAuthService, 'signUp').mockResolvedValue(response);

    let result = await controller.signUp(signUpUser);

    expect(result).toBe(response);
    expect(mockAuthService.signUp).toHaveBeenCalledTimes(1);
  });

  it('changePassword => should update a user', async () => {
    jest.spyOn(mockAuthService, 'changePassword').mockResolvedValue(users[0]);

    let result = await controller.changePassword(users[0], resetUser);

    expect(result).toBe(users[0]);
    expect(mockAuthService.changePassword).toHaveBeenCalledTimes(1);
  });

  it('resetPassword => should reset a password', async () => {
    jest.spyOn(mockAuthService, 'resetPassword').mockResolvedValue(users[0]);

    let result = await controller.resetPassword(users[0]);

    expect(result).toBeUndefined();

    expect(mockAuthService.resetPassword).toHaveBeenCalledTimes(1);
  });

  it('resetOtherUserPassword => should reset another users password', async () => {
    jest.spyOn(mockAuthService, 'resetPassword').mockResolvedValue(users[0]);

    let result = await controller.resetOtherUserPassword(users[0]);

    expect(result).toBeUndefined();

    expect(mockAuthService.resetPassword).toHaveBeenCalledTimes(1);
  });
});
