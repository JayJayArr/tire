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

  public getPersonalTimes(
    start?: Date,
    end?: Date,
  ): Promise<{ data: TimeEntry }[]> {
    return new Promise((resolve, reject) => {
      this.http
        .post<TimeEntry[]>(`${this.apiurl}/times`, { start: start, end: end })
        .subscribe({
          next: (data) => {
            if (data.length === 0) {
              reject([]);
            }
            let prepared: { data: TimeEntry }[] = [];
            data.forEach((entry) => {
              prepared.push({ data: entry });
            });
            resolve(prepared);
          },
          error: (error) => {
            console.log(error), reject([]);
          },
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
        .subscribe({
          next: (data) => {
            if (data.length === 0) {
              reject([]);
            }
            let prepared: { data: TimeEntry }[] = [];
            data.forEach((entry) => {
              prepared.push({ data: entry });
            });
            resolve(prepared);
          },
          error: (error) => {
            console.log(error);
            reject([]);
          },
        });
    });
  }

  public createTimeEntry(timeentry: TimeEntry): Promise<TimeEntry | undefined> {
    return new Promise((resolve, reject) => {
      this.http.put<TimeEntry>(`${this.apiurl}/times`, timeentry).subscribe({
        next: (data) => {
          if (!data) {
            reject([]);
          }
          resolve(data);
        },
        error: (error) => {
          console.log(error);
          reject([]);
        },
      });
    });
  }

  public updateTimeEntry(timeentry: TimeEntry): Promise<TimeEntry | undefined> {
    return new Promise((resolve, reject) => {
      this.http.patch<TimeEntry>(`${this.apiurl}/times`, timeentry).subscribe({
        next: (data) => {
          if (!data) {
            reject([]);
          }
          resolve(data);
        },
        error: (error) => {
          console.log(error);
          reject([]);
        },
      });
    });
  }
}
