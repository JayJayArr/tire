import { Component } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogService,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToastrService,
  NbTreeGridPresentationNode,
} from '@nebular/theme';
import { TimesService } from '../services/times.service';
import { TimeEntry, TreeNode, User } from '../types';
import { FormsModule } from '@angular/forms';
import { TimetableComponent } from '../timetable/timetable.component';
import { NbAuthService } from '@nebular/auth';
import { UsersService } from '../services/users.service';
import { TimedialogComponent } from '../timedialog/timedialog.component';

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
    private dialogService: NbDialogService,
  ) {}

  data: TreeNode<TimeEntry>[] = [];

  selectedCardno = '';
  user = {
    cardno: '',
    email: '',
    role: '',
  };
  allowEdit: boolean = true;
  loading: boolean = false;
  availableCardnos: string[] = [];
  date = new Date(Date.now());
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

  opendialog() {
    if (this.allowEdit) {
      this.dialogService
        .open(TimedialogComponent, {
          context: {
            timeentry: {
              cardno: this.selectedCardno,
              indevice: '',
              intime: new Date(),
            },
            title: 'Create',
          },
        })
        .onClose.subscribe((user) => {
          if (user) {
            this.createTimeEntry(user);
          }
        });
    }
  }

  async createTimeEntry(timeentry: TimeEntry) {
    await this.timesService
      .createTimeEntry(timeentry)
      .then((res) => {
        this.toastrService.success('TimeEntry saved to database', 'Success');
      })
      .catch((error) => {
        this.toastrService.danger(error, 'Error');
      });
    await this.refresh();
  }

  async refresh() {
    this.loading = true;
    this.dateRange.end = new Date(Date.now());
    this.data = await this.timesService
      .getOverviewTimes(
        this.selectedCardno,
        this.dateRange.start,
        this.dateRange.end,
      )
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
        this.toastrService.danger(
          'No Data found for this card number and time frame',
          'Error',
        );
        return [];
      });
    this.loading = false;
  }
}
