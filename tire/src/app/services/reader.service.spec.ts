import { TestBed } from '@angular/core/testing';

import { ReaderService } from './reader.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Reader } from '../types';

describe('ReaderService', () => {
  let service: ReaderService;
  let httpTesting: HttpTestingController;

  const readers = [
    {
      id: '3',
      name: 'YeetReader',
      active: true,
    },
    {
      id: '284',
      name: 'Second Reader.&*/!@#$%^',
      active: false,
    },
  ] as Reader[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ReaderService,
      ],
    });
    service = TestBed.inject(ReaderService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getReaders => should get all readers from the Backend', async () => {
    jest.spyOn(service, 'getReaders');
    const usersPromise = service.getReaders();

    const req = httpTesting.expectOne(
      service.apiurl + '/reader',
      'Request to load the users',
    );
    expect(req.request.method).toBe('GET');
    req.flush(readers);
    expect(await usersPromise).toEqual(readers);

    httpTesting.verify();

    expect(service.getReaders).toHaveBeenCalledTimes(1);
  });

  it('postReader => should post a reader to the Backend', async () => {
    jest.spyOn(service, 'postReader');
    const usersPromise = service.postReader(readers[0]);

    const req = httpTesting.expectOne(
      service.apiurl + '/reader',
      'Request to load the users',
    );
    expect(req.request.method).toBe('POST');
    req.flush(readers);
    expect(await usersPromise).toEqual(readers);

    httpTesting.verify();

    expect(service.postReader).toHaveBeenCalledTimes(1);
  });

  it('triggerSync => should trigger a Sync from the Access control in the backend', async () => {
    jest.spyOn(service, 'triggerSyncFromAC');
    const usersPromise = service.triggerSyncFromAC();

    const req = httpTesting.expectOne(
      service.apiurl + '/reader',
      'Request to load the users',
    );
    expect(req.request.method).toBe('PATCH');
    req.flush(420);
    expect(await usersPromise).toEqual(420);

    httpTesting.verify();

    expect(service.triggerSyncFromAC).toHaveBeenCalledTimes(1);
  });
});
