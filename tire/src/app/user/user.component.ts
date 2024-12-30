import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbToastrService,
} from '@nebular/theme';
import { User } from '../types';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../services/users.service';

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
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private toastrService: NbToastrService,
  ) {}
  data: User[] = [];
  filterstring = '';
  displayedColumns: string[] = ['email', 'cardno', 'role', 'active'];
  async refresh() {
    //TODO: paginate the users
    this.data = await this.usersService.getUsers().catch((error) => {
      this.toastrService.danger('No users found', 'Error');
      return [];
    });
  }
  async ngOnInit() {
    await this.refresh();
  }
}
