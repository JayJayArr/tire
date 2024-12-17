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
      this.http
        .get<Connector[]>(`${this.apiurl}/connector`)
        .subscribe((res) => {
          if (res.length === 0) {
            reject([]);
          }
          this.connectors = res;
          console.log(res);
          resolve(res);
        });
    });
  }

  public putConnectors(connector: Connector): Promise<Connector[]> {
    return new Promise((resolve, reject) => {
      this.http
        .put<Connector[]>(`${this.apiurl}/connector`, connector)
        .subscribe((res) => {
          if (res.length === 0) {
            reject([]);
          }
          resolve(res);
        });
    });
  }
}
