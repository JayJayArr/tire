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
  public gettimes(): Promise<TimeEntry[]> {
    return new Promise((resolve, reject) => {
      this.http.get<TimeEntry[]>(`${this.apiurl}/times`).subscribe((res) => {
        if (res.length === 0) {
          reject([]);
        }
        resolve(res);
      });
    });
  }
}
