import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogService,
  NbIconModule,
  NbInputModule,
  NbToastrService,
} from '@nebular/theme';
import { User } from '../types';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../services/users.service';
import { UserdialogComponent } from '../userdialog/userdialog.component';

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

  filterstring = '';
  displayedColumns: string[] = ['email', 'cardno', 'role', 'active'];
  async refresh() {
    //TODO: paginate the users
    this.dataSource.data = await this.usersService.getUsers().catch((error) => {
      this.toastrService.danger('No users found', 'Error');
      return [];
    });
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

  opendialog(user: User) {
    console.log(user);
    this.dialogService
      .open(UserdialogComponent, {
        context: { user },
      })
      .onClose.subscribe((user) => {
        if (user) {
          this.saveUser(user);
        }
      });
  }

  saveUser(user: User) {
    this.usersService
      .saveUser(user)
      .then((res) => {
        this.toastrService.success('User saved to database', 'Success');
      })
      .catch((error) => {
        this.toastrService.danger(error, 'Error');
      });
  }
}
