import { Component } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NbButtonModule, NbCardModule, NbIconModule, NbSpinnerModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private usersService: UsersService) {}
  loading = false;
  async syncUsers() {
    this.loading = true;
    await this.usersService.triggerSyncFromAC().catch((err) => {
      // console.log(err);
      this.loading = false;
    });
    this.loading = false;
  }
}
