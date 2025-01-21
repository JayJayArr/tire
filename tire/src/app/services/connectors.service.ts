import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Connector } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ConnectorsService {
  apiurl = environment.apiBaseUrl;
  connectors: Connector[] = [];
  constructor(private http: HttpClient) {}

  public getConnectors(): Promise<Connector[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Connector[]>(`${this.apiurl}/connector`).subscribe({
        next: (data) => {
          if (data.length === 0) {
            resolve([]);
          }
          this.connectors = data;
          resolve(data);
        },
        error: (error) => {
          console.error(error);
          reject([]);
        },
      });
    });
  }

  public putConnectors(connector: Connector): Promise<Connector[]> {
    return new Promise((resolve, reject) => {
      this.http
        .put<Connector[]>(`${this.apiurl}/connector`, connector)
        .subscribe({
          next: (data) => {
            if (data.length === 0) {
              resolve([]);
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
}
