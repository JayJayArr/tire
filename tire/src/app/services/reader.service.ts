import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reader } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  apiurl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getReaders(): Promise<Reader[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Reader[]>(`${this.apiurl}/reader`).subscribe({
        next: (data) => {
          if (data.length === 0) {
            resolve([]);
          }
          resolve(data);
        },
        error: (err) => {
          console.error(err);
          reject([]);
        },
      });
    });
  }

  public postReader(reader: Reader): Promise<Reader> {
    return new Promise((resolve, reject) => {
      this.http.post<Reader>(`${this.apiurl}/reader`, reader).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.error(err);
          reject([]);
        },
      });
    });
  }

  public triggerSyncFromAC(): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      try {
        this.http.patch<number>(`${this.apiurl}/reader`, {}).subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            console.error(err);
            reject([]);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
