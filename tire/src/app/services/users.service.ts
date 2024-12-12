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
  public getAvailableUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.apiurl}/users`).subscribe((res) => {
        if (res.length === 0) {
          reject([]);
        }
        console.log(res);
        resolve(res);
      });
    });
  }
}
