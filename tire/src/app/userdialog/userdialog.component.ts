import { Component, Input } from '@angular/core';
import { User } from '../types';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogRef,
  NbInputModule,
  NbToggleModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userdialog',
  standalone: true,
  imports: [
    NbCardModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbToggleModule,
  ],
  templateUrl: './userdialog.component.html',
  styleUrl: './userdialog.component.css',
})
export class UserdialogComponent {
  constructor(protected dialogRef: NbDialogRef<any>) {}
  @Input() user: User = { email: '', cardno: '', roles: [], active: false };

  close() {
    this.dialogRef.close();
  }
}
