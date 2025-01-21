import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Role, User } from '../types';

describe('UsersService', () => {
  let service: UsersService;
  let httpTesting: HttpTestingController;
  let users = [
    {
      id: 1,
      email: 'admin@admin.com',
      cardno: '0000',
      roles: [Role.User, Role.PowerUser, Role.Admin],
      active: true,
    },
    {
      id: 1234,
      email: 'jakob.rietdorf@nutz.com',
      cardno: '69420',
      roles: [Role.User, Role.PowerUser, Role.Admin],
      active: false,
    },
  ] as User[];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UsersService,
      ],
    });

    service = TestBed.inject(UsersService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers => should get all users', async () => {
    jest.spyOn(service, 'getUsers');
    const usersPromise = service.getUsers();

    const req = httpTesting.expectOne(
      'http://localhost:3000/api/v1/users',
      'Request to load the users',
    );
    expect(req.request.method).toBe('GET');
    req.flush(users);
    expect(await usersPromise).toEqual(users);

    httpTesting.verify();

    expect(service.getUsers).toHaveBeenCalledTimes(1);
  });

  it('getAvailableUsers => should get only the available users', async () => {
    jest.spyOn(service, 'getAvailableUsers');
    const availableUsersPromise = service.getAvailableUsers();

    const req = httpTesting.expectOne(
      'http://localhost:3000/api/v1/users',
      'Request to load the users',
    );
    expect(req.request.method).toBe('GET');
    req.flush(users);
    expect(await availableUsersPromise).toBe(users[0]);

    httpTesting.verify();

    expect(service.getAvailableUsers).toHaveBeenCalledTimes(1);
  });
});
