import { TestBed } from '@angular/core/testing';

import { TimesService } from './times.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TimeEntry } from '../types';

describe('TimesService', () => {
  let service: TimesService;
  let httpTesting: HttpTestingController;
  const timeEntries = [
    {
      id: 1,
      indevice: 'Cool Reader',
      intime: new Date(),
      cardno: '69420',
      faulty: false,
    },
    {
      id: 384729,
      indevice: 'Cool Reader',
      intime: new Date(),
      outdevice: 'Cool Reader',
      outtime: new Date(),
      cardno: '69420',
    },
    {
      id: 1234,
      indevice: 'Cool Reader',
      intime: new Date(),
      faulty: true,
      cardno: '69420',
    },
  ] as TimeEntry[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TimesService,
      ],
    });
    service = TestBed.inject(TimesService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPersonalTimes => should get times for the logged in user and convert it to a usable format for the timetable', async () => {
    jest.spyOn(service, 'getPersonalTimes');
    const usersPromise = service.getPersonalTimes();

    const req = httpTesting.expectOne(
      service.apiurl + '/times',
      'Request to load the users',
    );
    expect(req.request.method).toBe('POST');
    req.flush(timeEntries);
    let prepared: { data: TimeEntry }[] = [];
    timeEntries.forEach((entry) => {
      prepared.push({ data: entry });
    });
    expect(await usersPromise).toEqual(prepared);

    httpTesting.verify();

    expect(service.getPersonalTimes).toHaveBeenCalledTimes(1);
  });

  it('getOverviewTime => should get times for a specific person and convert it to a usable format for the timetable', async () => {
    jest.spyOn(service, 'getOverviewTimes');
    const usersPromise = service.getOverviewTimes('69420');

    const req = httpTesting.expectOne(
      service.apiurl + '/times/69420',
      'Request to load the users',
    );
    expect(req.request.method).toBe('POST');
    req.flush(timeEntries);
    let prepared: { data: TimeEntry }[] = [];
    timeEntries.forEach((entry) => {
      prepared.push({ data: entry });
    });
    expect(await usersPromise).toEqual(prepared);

    httpTesting.verify();

    expect(service.getOverviewTimes).toHaveBeenCalledTimes(1);
  });

  it('createTimeEntry => should create a Entry for a person and have it returned', async () => {
    jest.spyOn(service, 'createTimeEntry');
    const usersPromise = service.createTimeEntry(timeEntries[0]);

    const req = httpTesting.expectOne(
      service.apiurl + '/times',
      'Request to load the users',
    );
    expect(req.request.method).toBe('PUT');
    req.flush(timeEntries[0]);
    expect(await usersPromise).toEqual(timeEntries[0]);

    httpTesting.verify();

    expect(service.createTimeEntry).toHaveBeenCalledTimes(1);
  });

  it('upateTimeEntry => should update a Entry for a person and have it returned', async () => {
    jest.spyOn(service, 'updateTimeEntry');
    const usersPromise = service.updateTimeEntry(timeEntries[0]);

    const req = httpTesting.expectOne(
      service.apiurl + '/times',
      'Request to load the users',
    );
    expect(req.request.method).toBe('PATCH');
    req.flush(timeEntries[0]);
    expect(await usersPromise).toEqual(timeEntries[0]);

    httpTesting.verify();

    expect(service.updateTimeEntry).toHaveBeenCalledTimes(1);
  });
});
