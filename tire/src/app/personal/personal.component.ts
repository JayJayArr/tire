import { Component, OnInit } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { TimeEntry, TreeNode } from '../types';
import { TimesService } from '../services/times.service';
import { FormsModule } from '@angular/forms';
import { TimetableComponent } from '../timetable/timetable.component';

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
    TimetableComponent,
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
})
export class PersonalComponent implements OnInit {
  constructor(private timesService: TimesService) { }
  data: TreeNode<TimeEntry>[] = [];

  date = new Date();
  dateRange = {
    start: new Date(this.date.getFullYear(), this.date.getMonth(), 1),
    end: this.date,
  };

  async ngOnInit() {
    this.data = await this.timesService.getPersonalTimes();
  }

  async refresh() {
    console.log(this.dateRange);
    this.data = await this.timesService.getPersonalTimes();
  }
}
