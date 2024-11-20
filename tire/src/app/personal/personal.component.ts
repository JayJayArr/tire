import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { TimeEntry, TreeNode } from '../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [NbTreeGridModule, NbCardModule, NgFor, NgIf],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
})
export class PersonalComponent {
  private apiUrl = 'http://localhost:3000/api/vi/times';
  constructor(private http: HttpClient) { }
  getTimes(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: { Accept: 'application/json' },
    });
  }

  customColumn = 'name';
  defaultColumns = ['size', 'kind', 'items'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  data: TreeNode<TimeEntry>[] = [];
}
