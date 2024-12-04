import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NbButtonModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuItem,
  NbMenuModule,
  NbSidebarModule,
  NbUserModule,
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterContentChecked {
  user: User = {
    cardno: '',
    email: '',
    role: '',
  };

  title = 'tire';
  clickhandler: any;
  items: NbMenuItem[] = [
    { title: 'Personal times', link: 'personal', icon: 'clock-outline' },
    {
      title: 'Overview',
      link: 'overview',
      icon: 'person-outline',
    },
    { title: 'Global Settings', link: 'admin', icon: 'settings-2-outline' },
    { title: 'Log out', link: 'auth/logout', icon: 'unlock-outline' },
  ];

  constructor(
    private authService: NbAuthService,
    private ref: ChangeDetectorRef,
  ) {
    console.log(environment);

    this.authService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      } else {
        this.user = {
          cardno: '',
          email: '',
          role: '',
        };
      }
    });
  }
  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }
}
