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
      this.http.get<Reader[]>(`${this.apiurl}/reader`).subscribe((res) => {
        if (res.length === 0) {
          reject([]);
        }
        resolve(res);
      });
    });
  }

  public postReader(reader: Reader): Promise<Reader> {
    return new Promise((resolve, reject) => {
      this.http
        .post<Reader>(`${this.apiurl}/reader`, reader)
        .subscribe((res) => {
          resolve(res);
        });
    });
  }

  public triggerSyncFromAC(): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      try {
        this.http
          .patch<number>(`${this.apiurl}/reader`, {})
          .subscribe((res) => {
            resolve(res);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}
