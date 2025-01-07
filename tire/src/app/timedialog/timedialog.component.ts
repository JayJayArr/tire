import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogRef,
  NbInputModule,
} from '@nebular/theme';
import { TimeEntry } from '../types';

@Component({
  selector: 'app-timedialog',
  standalone: true,
  imports: [
    NbCardModule,
    FormsModule,
    NbButtonModule,
    NbInputModule,
    NbDatepickerModule,
  ],
  templateUrl: './timedialog.component.html',
  styleUrl: './timedialog.component.css',
})
export class TimedialogComponent {
  constructor(protected dialogRef: NbDialogRef<any>) {}
  @Input() timeentry: TimeEntry = {
    id: 0,
    cardno: '',
    indevice: '',
    intime: new Date(),
  };

  close() {
    this.dialogRef.close();
  }

  saveTimeEntry() {
    this.dialogRef.close(this.timeentry);
  }
}
