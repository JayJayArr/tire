import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeEntry } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimesService {
  apiurl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getPersonalTimes(): Promise<{ data: TimeEntry }[]> {
    return new Promise((resolve, reject) => {
      this.http.get<TimeEntry[]>(`${this.apiurl}/times`).subscribe((res) => {
        if (res.length === 0) {
          reject([]);
        }
        console.log(res);
        let prepared: { data: TimeEntry }[] = [];
        res.forEach((entry) => {
          prepared.push({ data: entry });
        });
        resolve(prepared);
      });
    });
  }

  public getOverviewTimes(cardno: String): Promise<{ data: TimeEntry }[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<TimeEntry[]>(`${this.apiurl}/times/${cardno}`)
        .subscribe((res) => {
          if (res.length === 0) {
            reject([]);
          }
          console.log(res);
          let prepared: { data: TimeEntry }[] = [];
          res.forEach((entry) => {
            prepared.push({ data: entry });
          });
          resolve(prepared);
        });
    });
  }
}
