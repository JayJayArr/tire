import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  apiurl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getPersonalTimesFile(start?: Date, end?: Date): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.apiurl}/file`,
          { start: start, end: end },
          {
            headers: new HttpHeaders({ Accept: 'text/csv' }),
            responseType: 'blob' as 'json',
          },
        )
        .subscribe({
          next: async (data: any) => {
            if (data.size) {
              let blob = new Blob([data], { type: 'text/csv' });
              let url = URL.createObjectURL(blob);
              // let pwa = window.open(url);

              const a: HTMLAnchorElement = document.createElement(
                'a',
              ) as HTMLAnchorElement;
              let downloadLink = document.createElement('a');
              a.href = url;
              a.download =
                start?.toLocaleDateString() +
                '-' +
                end?.toLocaleDateString() +
                '.csv';
              document.body.appendChild(a);
              a.click();

              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              return resolve(true);
            } else {
              return reject(false);
            }
          },
          error: (error) => {
            console.error(error);
            return reject(false);
          },
        });
    });
  }

  public getOverviewTimesFile(
    cardno: String,
    start?: Date,
    end?: Date,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.apiurl}/file/${cardno}`,
          { start: start, end: end },

          {
            headers: new HttpHeaders({ Accept: 'text/csv' }),
            responseType: 'blob' as 'json',
          },
        )
        .subscribe({
          next: async (data: any) => {
            if (data.size) {
              let blob = new Blob([data], { type: 'text/csv' });
              let url = URL.createObjectURL(blob);
              // let pwa = window.open(url);

              const a: HTMLAnchorElement = document.createElement(
                'a',
              ) as HTMLAnchorElement;
              document.createElement('a');
              a.href = url;
              a.download =
                cardno +
                '-' +
                start?.toLocaleDateString() +
                '-' +
                end?.toLocaleDateString() +
                '.csv';
              document.body.appendChild(a);
              a.click();

              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              return resolve(true);
            } else {
              return reject(false);
            }
          },
          error: (error) => {
            console.error(error);
            return reject(false);
          },
        });
    });
  }
}
