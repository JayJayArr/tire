import { Component } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-confirmdialog',
    imports: [NbCardModule, NbButtonModule],
    templateUrl: './confirmdialog.component.html',
    styleUrl: './confirmdialog.component.css'
})
export class ConfirmdialogComponent {
  constructor(protected dialogRef: NbDialogRef<any>) { }

  abort(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
