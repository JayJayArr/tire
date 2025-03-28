import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogRef,
  NbInputModule,
  NbTimepickerModule,
} from '@nebular/theme';
import { TimeEntry } from '../types';

@Component({
    selector: 'app-timedialog',
    imports: [
        NbCardModule,
        FormsModule,
        NbButtonModule,
        NbInputModule,
        NbDatepickerModule,
        NbTimepickerModule,
    ],
    templateUrl: './timedialog.component.html',
    styleUrl: './timedialog.component.css'
})
export class TimedialogComponent {
  constructor(protected dialogRef: NbDialogRef<any>) { }
  @Input() timeentry: TimeEntry = {
    id: 0,
    cardno: '',
    indevice: '',
    intime: new Date(),
    outtime: new Date(),
    outdevice: '',
  };
  @Input() title: string = '';

  close() {
    this.dialogRef.close();
  }

  saveTimeEntry() {
    this.dialogRef.close(this.timeentry);
  }
}
