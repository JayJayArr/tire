import { Component, OnInit } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
  NbTreeGridModule,
} from '@nebular/theme';
import { TimeEntry, TreeNode } from '../types';
import { TimesService } from '../services/times.service';
import { getDataDiff } from '../helpers';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    NbTreeGridModule,
    NbCardModule,
    NbDatepickerModule,
    FormsModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
})
export class PersonalComponent implements OnInit {
  constructor(
    private timesService: TimesService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<TimeEntry>,
  ) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  customColumn = 'indevice';
  defaultColumns = ['outdevice', 'intime', 'outtime', 'diff'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  data: TreeNode<TimeEntry>[] = [];
  dataSource: NbTreeGridDataSource<any>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  date = new Date();
  dateRange = {
    start: new Date(this.date.getFullYear(), this.date.getMonth(), 1),
    end: this.date,
  };

  async ngOnInit() {
    this.data = await this.timesService.gettimes();
    this.data.forEach((row) => {
      row.data.intime = new Date(row.data.intime);
      if (row.data.outtime) {
        row.data.outtime = new Date(row.data.outtime);
        row.data.diff = getDataDiff(row.data.intime, row.data.outtime);
      }
    });
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  changeSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  refresh() {
    console.log(this.dateRange);
  }
}
