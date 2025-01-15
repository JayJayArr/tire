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
      this.http.get<User[]>(`${this.apiurl}/users`).subscribe({
        next: (data) => {
          if (data.length === 0) {
            reject([]);
          }
          data.sort(function (a, b) {
            if (a.email.toLowerCase() > b.email.toLowerCase()) {
              return 1;
            } else {
              return -1;
            }
          });
          resolve(data);
        },
        error: (error) => {
          console.error(error);
          reject([]);
        },
      });
    });
  }

  public getAvailableUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.apiurl}/users`).subscribe({
        next: (data) => {
          if (data.length === 0) {
            reject([]);
          }
          data.filter((user) => {
            user.active;
          });
          resolve(data);
        },
        error: (error) => {
          console.error(error);
          reject([]);
        },
      });
    });
  }

  public updateUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${this.apiurl}/users`, user).subscribe({
        next: (data) => {
          if (!data) {
            reject([]);
          }
          resolve(data);
        },
        error: (error) => {
          console.error(error);
          reject([]);
        },
      });
    });
  }

  public deleteUser(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete<boolean>(`${this.apiurl}/users/${user.id}`).subscribe({
        next: (data) => {
          if (!data) {
            reject([]);
          }
          resolve(data);
        },
        error: (error) => {
          console.error(error);
          reject([]);
        },
      });
    });
  }

  public triggerSyncFromAC(): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      try {
        this.http.patch<number>(`${this.apiurl}/users`, {}).subscribe({
          next: (data) => {
            console.log('Synced users: ', data);
            resolve(data);
          },
          error: (error) => {
            console.error(error);
            reject([]);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
