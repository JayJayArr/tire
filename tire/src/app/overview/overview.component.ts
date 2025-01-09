import { Component } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToastrService,
} from '@nebular/theme';
import { TimesService } from '../services/times.service';
import { TimeEntry, TreeNode, User } from '../types';
import { FormsModule } from '@angular/forms';
import { TimetableComponent } from '../timetable/timetable.component';
import { NbAuthService } from '@nebular/auth';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
    NbDatepickerModule,
    FormsModule,
    TimetableComponent,
    NbSpinnerModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  constructor(
    private timesService: TimesService,
    private authService: NbAuthService,
    private usersService: UsersService,
    private toastrService: NbToastrService,
  ) { }

  data: TreeNode<TimeEntry>[] = [];

  selectedCardno = '';
  user = {
    cardno: '',
    email: '',
    role: '',
  };
  loading: boolean = false;
  availableCardnos: string[] = [];
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
    this.refresh();
    await this.usersService.getAvailableUsers().then((response) =>
      response.forEach((user) => {
        if (!this.availableCardnos.includes(user.cardno)) {
          this.availableCardnos.push(user.cardno);
        }
      }),
    );
  }

  async refresh() {
    this.loading = true;
    this.data = await this.timesService
      .getOverviewTimes(
        this.selectedCardno,
        this.dateRange.start,
        this.dateRange.end,
      )
      .catch((error) => {
        this.toastrService.danger(
          'No Data found for this card number and time frame',
          'Error',
        );
        return [];
      });
    this.loading = false;
  }
}
