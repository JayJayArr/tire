import { Component, OnInit } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbToastrService,
  NbSpinnerModule,
} from '@nebular/theme';
import { TimeEntry, TreeNode } from '../types';
import { TimesService } from '../services/times.service';
import { FormsModule } from '@angular/forms';
import { TimetableComponent } from '../timetable/timetable.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    NbCardModule,
    NbDatepickerModule,
    FormsModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    TimetableComponent,
    NbSpinnerModule,
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
})
export class PersonalComponent implements OnInit {
  constructor(
    private timesService: TimesService,
    private toastrService: NbToastrService,
  ) {}
  loading: boolean = false;

  data: TreeNode<TimeEntry>[] = [];

  date = new Date();
  dateRange = {
    start: new Date(this.date.getFullYear(), this.date.getMonth(), 1),
    end: this.date,
  };

  async ngOnInit() {
    await this.refresh();
  }

  async refresh() {
    this.loading = true;
    this.data = await this.timesService
      .getPersonalTimes(this.dateRange.start, this.dateRange.end)
      .then((data) => {
        if (data.length === 0) {
          this.toastrService.danger(
            'No data found for this timeframe',
            'Error',
          );
          return [];
        } else {
          return data;
        }
      })
      .catch((error) => {
        console.error(error);
        this.toastrService.danger('No data found for this timeframe', 'Error');
        return [];
      });
    this.loading = false;
  }
}
