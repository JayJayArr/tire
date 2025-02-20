import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest,
  NbToastrService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
  NbTreeGridModule,
  NbTreeGridPresentationNode,
} from '@nebular/theme';
import { TimeEntry, TreeNode } from '../types';
import { getDataDiff } from '../helpers';
import { TimedialogComponent } from '../timedialog/timedialog.component';
import { TimesService } from '../services/times.service';

@Component({
    selector: 'app-timetable',
    imports: [NbTreeGridModule],
    templateUrl: './timetable.component.html',
    styleUrl: './timetable.component.css'
})
export class TimetableComponent implements OnChanges {
  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<TimeEntry>,
    private dialogService: NbDialogService,
    private timesService: TimesService,
    private toastrService: NbToastrService,
  ) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  customColumn = 'indevice';
  defaultColumns = ['outdevice', 'intime', 'outtime', 'diff'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  @Input() data: TreeNode<TimeEntry>[] = [];
  @Input() allowEdit: boolean = false;
  dataSource: NbTreeGridDataSource<any>;

  sortColumn: string = 'intime';
  sortDirection: NbSortDirection = NbSortDirection.DESCENDING;

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

  opendialog(timeentry: NbTreeGridPresentationNode<TimeEntry>) {
    if (this.allowEdit) {
      this.dialogService
        .open(TimedialogComponent, {
          context: { timeentry: timeentry.data, title: 'Edit' },
        })
        .onClose.subscribe((user) => {
          if (user) {
            this.saveTimeEntry(user);
          }
        });
    }
  }

  async saveTimeEntry(timeentry: TimeEntry) {
    await this.timesService
      .updateTimeEntry(timeentry)
      .then((res) => {
        this.toastrService.success('TimeEntry saved to database', 'Success');
      })
      .catch((error) => {
        this.toastrService.danger(error, 'Error');
      });
  }
}
