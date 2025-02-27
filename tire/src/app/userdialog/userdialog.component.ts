import { Component, Input, OnInit } from '@angular/core';
import { Role, User } from '../types';
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
    imports: [
        NbCardModule,
        FormsModule,
        NbInputModule,
        NbButtonModule,
        NbToggleModule,
    ],
    templateUrl: './userdialog.component.html',
    styleUrl: './userdialog.component.css'
})
export class UserdialogComponent implements OnInit {
  constructor(protected dialogRef: NbDialogRef<any>) { }
  @Input() title: String = '';
  @Input() user: User = {
    id: 0,
    email: '',
    cardno: '',
    roles: [],
    active: false,
  };
  adminrole = this.user.roles.includes(Role.Admin);
  userrole = this.user.roles.includes(Role.User);
  poweruserrole = this.user.roles.includes(Role.PowerUser);
  email = this.user.email;
  cardno = this.user.cardno;

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.adminrole = this.user.roles.includes(Role.Admin);
    this.userrole = this.user.roles.includes(Role.User);
    this.poweruserrole = this.user.roles.includes(Role.PowerUser);
  }

  saveUser() {
    this.dialogRef.close(
      this.constructUser(
        this.user,
        this.userrole,
        this.poweruserrole,
        this.adminrole,
      ),
    );
  }

  constructUser(
    user: User,
    userrole?: boolean,
    poweruserrole?: boolean,
    adminrole?: boolean,
  ): User {
    let editedUser = user;
    editedUser.roles = [];
    if (userrole) {
      editedUser.roles.push(Role.User);
    }
    if (poweruserrole) {
      editedUser.roles.push(Role.PowerUser);
    }
    if (adminrole) {
      editedUser.roles.push(Role.Admin);
    }
    return editedUser;
  }
}
