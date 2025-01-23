import { TestBed } from '@angular/core/testing';

import { ConnectorsService } from './connectors.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Connector } from '../types';

describe('ConnectorsService', () => {
  let service: ConnectorsService;
  let httpTesting: HttpTestingController;
  const connectors = [
    {
      name: 'ProWatch',
      active: true,
    },
    {
      name: 'OnGuard',
      active: false,
    },
  ] as Connector[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ConnectorsService,
      ],
    });
    service = TestBed.inject(ConnectorsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getConnectors => should get all connectors from the Backend', async () => {
    jest.spyOn(service, 'getConnectors');
    const usersPromise = service.getConnectors();

    const req = httpTesting.expectOne(
      service.apiurl + '/connector',
      'Request to load the users',
    );
    expect(req.request.method).toBe('GET');
    req.flush(connectors);
    expect(await usersPromise).toEqual(connectors);

    httpTesting.verify();

    expect(service.getConnectors).toHaveBeenCalledTimes(1);
  });

  it('putConnectors => should put a connector to the Backend', async () => {
    jest.spyOn(service, 'putConnectors');
    const usersPromise = service.putConnectors(connectors[0]);

    const req = httpTesting.expectOne(
      service.apiurl + '/connector',
      'Request to load the users',
    );
    expect(req.request.method).toBe('PUT');
    req.flush(connectors[0]);
    expect(await usersPromise).toEqual(connectors[0]);

    httpTesting.verify();

    expect(service.putConnectors).toHaveBeenCalledTimes(1);
  });
});
