import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('FileService', () => {
  let service: FileService;
  let httpTesting: HttpTestingController;
  global.URL.createObjectURL = jest.fn();
  global.URL.revokeObjectURL = jest.fn();

  let data = `id,indevice,outdevice,intime,outtime,cardno
  22141, A - EG - ZB - E03 C4R01 MA Eing.Stachus,, Thu Dec 12 2024 07: 41: 43 GMT +0100(Central European Standard Time),, 10015
  21802, A - EG - ZB - E03 C4R01 MA Eing.Stachus,, Tue Dec 10 2024 12: 53:03 GMT +0100(Central European Standard Time),, 10015
  21387, A - EG - ZB - E03 C4R01 MA Eing.Stachus, A - EG - ZB - E03 C4R01 MA Eing.Stachus, Fri Dec 06 2024 07: 53: 44 GMT +0100(Central European Standard Time), Fri Dec 06 2024 10: 10: 23 GMT +0100(Central European Standard Time), 10015, 8199
  21251, A - EG - ZB - E03 C4R01 MA Eing.Stachus,, Thu Dec 05 2024 12: 50: 19 GMT +0100(Central European Standard Time),, 10015
  21016, A - EG - ZB - E03 C4R01 MA Eing.Stachus,, Wed Dec 04 2024 07: 46: 48 GMT +0100(Central European Standard Time),, 10015
  `;
  let blob = new Blob([data], { type: 'text/csv' });
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), FileService],
    });
    service = TestBed.inject(FileService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPersonalTimesFile => should reject on a empty response', async () => {
    jest.spyOn(service, 'getPersonalTimesFile');
    const filePromise = service.getPersonalTimesFile();

    const req = httpTesting.expectOne(
      service.apiurl + '/file',
      'request to download file',
    );
    expect(req.request.method).toBe('POST');
    req.flush(blob);
    expect(await filePromise).toEqual(true);

    httpTesting.verify();

    expect(service.getPersonalTimesFile).toHaveBeenCalledTimes(1);
  });

  it('getOverviewTimesFile => should reject on a empty response', async () => {
    jest.spyOn(service, 'getOverviewTimesFile');
    const filePromise = service.getOverviewTimesFile(
      '10490',
      new Date(),
      new Date(),
    );

    const req = httpTesting.expectOne(
      service.apiurl + '/file/10490',
      'request to download the files for 10490',
    );
    expect(req.request.method).toBe('POST');
    req.flush(blob);
    expect(await filePromise).toEqual(true);

    httpTesting.verify();

    expect(service.getOverviewTimesFile).toHaveBeenCalledTimes(1);
  });
});
