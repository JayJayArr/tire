import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
  NbTreeGridModule,
} from '@nebular/theme';
import { TimeEntry, TreeNode } from '../types';
import { getDataDiff } from '../helpers';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [NbTreeGridModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css',
})
export class TimetableComponent implements OnChanges {
  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<TimeEntry>,
  ) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  customColumn = 'indevice';
  defaultColumns = ['outdevice', 'intime', 'outtime', 'diff'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  @Input() data: TreeNode<TimeEntry>[] = [];
  dataSource: NbTreeGridDataSource<any>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  ngOnChanges(changes: SimpleChanges): void {
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
}
