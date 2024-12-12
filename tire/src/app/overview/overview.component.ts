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
import { NbAuthService } from '@nebular/auth';

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
  constructor(
    private timesService: TimesService,
    private authService: NbAuthService,
  ) { }

  data: TreeNode<TimeEntry>[] = [];

  selectedCardno = '';
  user = {
    cardno: '',
    email: '',
    role: '',
  };
  availableCardnos = ['10490', '10635']; //TODO: Pull those from the backend
  date = new Date();
  dateRange = {
    start: new Date(this.date.getFullYear(), this.date.getMonth()),
    end: this.date,
  };

  async ngOnInit() {
    this.authService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      } else {
        this.user = {
          cardno: '',
          email: '',
          role: '',
        };
      }
    });
    this.selectedCardno = this.user.cardno;
    this.data = await this.timesService.getOverviewTimes(this.selectedCardno);
  }

  async refresh() {
    console.log(this.dateRange);
    console.log(this.selectedCardno);
    this.data = await this.timesService.getOverviewTimes(this.selectedCardno);
  }
}
