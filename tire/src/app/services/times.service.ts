import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeEntry } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimesService {
  apiurl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getPersonalTimes(
    start?: Date,
    end?: Date,
  ): Promise<{ data: TimeEntry }[]> {
    return new Promise((resolve, reject) => {
      this.http
        .post<TimeEntry[]>(`${this.apiurl}/times`, { start: start, end: end })
        .subscribe((res) => {
          if (res.length === 0) {
            reject([]);
          }
          let prepared: { data: TimeEntry }[] = [];
          res.forEach((entry) => {
            prepared.push({ data: entry });
          });
          resolve(prepared);
        });
    });
  }

  public getOverviewTimes(
    cardno: String,
    start?: Date,
    end?: Date,
  ): Promise<{ data: TimeEntry }[]> {
    return new Promise((resolve, reject) => {
      this.http
        .post<
          TimeEntry[]
        >(`${this.apiurl}/times/${cardno}`, { start: start, end: end })
        .subscribe((res) => {
          if (res.length === 0) {
            reject([]);
          }
          let prepared: { data: TimeEntry }[] = [];
          res.forEach((entry) => {
            prepared.push({ data: entry });
          });
          resolve(prepared);
        });
    });
  }
}
