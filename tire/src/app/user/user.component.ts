import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogService,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSpinnerModule,
  NbToastrService,
} from '@nebular/theme';
import { Role, User } from '../types';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../services/users.service';
import { UserdialogComponent } from '../userdialog/userdialog.component';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NbCardModule,
    FormsModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    MatTableModule,
    UserdialogComponent,
    NbSpinnerModule,
    NbLayoutModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) { }
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  loading: boolean = false;

  filterstring = '';
  displayedColumns: string[] = [
    'email',
    'cardno',
    'role',
    'active',
    'edit',
    'resetPass',
    'delete',
  ];
  async refresh() {
    this.loading = true;
    this.dataSource.data = await this.usersService
      .getUsers()
      .then((data) => {
        if (data.length === 0) {
          this.toastrService.danger('No Data found', 'Error');
          return [];
        } else {
          return data;
        }
      })
      .catch((error) => {
        this.toastrService.danger('No users found', 'Error');
        return [];
      });
    this.loading = false;
  }
  async ngOnInit() {
    await this.refresh();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  resetFilter() {
    this.filterstring = '';
    this.dataSource.filter = '';
  }

  editdialog(user: User) {
    this.dialogService
      .open(UserdialogComponent, {
        context: { user, title: 'Edit User' },
      })
      .onClose.subscribe((user) => {
        if (user) {
          if (!user.cardno) {
            this.toastrService.danger('Card number cannot be empty', 'Error');
          } else {
            this.saveUser(user);
          }
        }
      });
  }

  adduserDialog() {
    this.dialogService
      .open(UserdialogComponent, {
        context: {
          user: {
            id: 0,
            email: '',
            cardno: '',
            roles: [Role.User],
            active: true,
          },
          title: 'Add User',
        },
      })
      .onClose.subscribe((user) => {
        if (user) {
          if (!user.cardno || !user.email) {
            this.toastrService.danger(
              'Card number and mail cannot be empty',
              'Error',
            );
          } else {
            this.saveUser(user);
          }
        }
      });
  }

  deletedialog(user: User) {
    this.dialogService
      .open(ConfirmdialogComponent, {
        context: {},
      })
      .onClose.subscribe((confirm) => {
        if (confirm) {
          this.deleteUser(user);
        }
      });
  }

  resetdialog(user: User) {
    this.dialogService
      .open(ConfirmdialogComponent, {
        context: {},
      })
      .onClose.subscribe((confirm) => {
        if (confirm) {
          this.resetPass(user);
        }
      });
  }

  saveUser(user: User) {
    this.usersService
      .updateUser(user)
      .then((res) => {
        this.toastrService.success('User saved to database', 'Success');
      })
      .catch((error) => {
        this.toastrService.danger(error, 'Error');
      });
  }

  deleteUser(user: User) {
    this.usersService
      .deleteUser(user)
      .then((res) => {
        this.toastrService.success('User deleted', 'Success');
      })
      .catch((error) => {
        this.toastrService.danger(error, 'Error');
      });
  }

  resetPass(user: User) {
    this.usersService
      .requestPassword(user)
      .then((res) => {
        this.toastrService.success(
          'Password for ' + user.email + ' reset to card number',
          'Success',
        );
      })
      .catch((error) => {
        this.toastrService.danger(error, 'Error');
      });
  }
}
