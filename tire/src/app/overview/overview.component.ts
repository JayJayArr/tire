import { Component } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { TimesService } from '../services/times.service';
import { TimeEntry, TreeNode } from '../types';
import { FormsModule } from '@angular/forms';
import { TimetableComponent } from '../timetable/timetable.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
    NbDatepickerModule,
    FormsModule,
    TimetableComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  constructor(private timesService: TimesService) { }

  data: TreeNode<TimeEntry>[] = [];

  selectedCardno = '';
  availableCardnos = ['1234', '5678'];
  date = new Date();
  dateRange = {
    start: new Date(this.date.getFullYear(), this.date.getMonth()),
    end: this.date,
  };

  async ngOnInit() {
    this.data = await this.timesService.gettimes();
  }

  refresh() {
    console.log(this.dateRange);
    console.log(this.selectedCardno);
  }
}
