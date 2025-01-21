import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  NbButtonModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuItem,
  NbMenuModule,
  NbSidebarModule,
  NbUserModule,
  NbActionsModule,
  NbSidebarState,
} from '@nebular/theme';
import { User } from './types';
import { NbAuthService } from '@nebular/auth';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NbLayoutModule,
    NbUserModule,
    NbIconModule,
    NbButtonModule,
    NbContextMenuModule,
    NbMenuModule,
    NbSidebarModule,
    NbActionsModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterContentChecked {
  title = 'tire';
  sidebarstatus: NbSidebarState = 'expanded';
  user: User = {
    id: 0,
    cardno: '',
    email: '',
    roles: [],
    active: false,
  };

  contextItems: NbMenuItem[] = [
    {
      title: 'Change password',
      link: 'auth/reset-password',
      icon: 'edit-outline',
    },
    {
      title: 'Logout',
      link: 'auth/logout',
      icon: 'lock-outline',
    },
  ];

  items: NbMenuItem[] = [
    { title: 'Personal times', link: 'personal', icon: 'clock-outline' },
    {
      title: 'Overview',
      link: 'overview',
      icon: 'list',
    },
    {
      title: 'Users',
      link: 'users',
      icon: 'person-outline',
    },
    {
      title: 'Readers',
      link: 'readers',
      icon: 'credit-card-outline',
    },
    { title: 'Global Settings', link: 'admin', icon: 'settings-2-outline' },
  ];

  constructor(
    private authService: NbAuthService,
    private ref: ChangeDetectorRef,
  ) {
    this.authService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      } else {
        this.user = {
          id: 0,
          cardno: '',
          email: '',
          roles: [],
          active: false,
        };
      }
    });
  }
  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  toggleSidebar() {
    if (this.sidebarstatus === 'expanded') {
      this.sidebarstatus = 'compacted';
    } else this.sidebarstatus = 'expanded';
  }
}
