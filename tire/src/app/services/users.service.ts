import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiurl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {
    this.getAvailableUsers();
  }
  public getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.apiurl}/users`).subscribe((res) => {
        if (res.length === 0) {
          reject([]);
        }
        res.sort(function (a, b) {
          if (a.email.toLowerCase() > b.email.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
        resolve(res);
      });
    });
  }

  public getAvailableUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.apiurl}/users`).subscribe((res) => {
        if (res.length === 0) {
          reject([]);
        }
        res.filter((user) => {
          user.active;
        });
        resolve(res);
      });
    });
  }

  public triggerSyncFromAC(): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      try {
        this.http.patch<number>(`${this.apiurl}/users`, {}).subscribe((res) => {
          console.log('Synced users: ', res);

          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
