import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  NbButtonModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbUserModule,
} from '@nebular/theme';
import { User } from './types';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { filter, map } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        NbLayoutModule,
        NbUserModule,
        NbIconModule,
        NbButtonModule,
        NbContextMenuModule,
        NbMenuModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  user: User = {
    email: 'login',
    cardno: '',
    role: '',
  };

  title = 'tire';
  clickhandler: any;
  items = [
    { title: 'Global Settings', link: 'admin', icon: 'settings-2-outline' },
    { title: 'Log out', icon: 'unlock-outline' },
  ];

  constructor(
    private router: Router,
    private tokenService: NbTokenService,
    private authService: NbAuthService,
    private nbMenuService: NbMenuService,
  ) {
    this.authService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        this.user = token.getPayload();
        console.log(this.user);
      }
    });
  }
  ngOnInit(): void {
    this.clickhandler = this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'usercontextmenu'),
        map(({ item: { title } }) => title),
      )
      .subscribe((title) => {
        if (title == 'Log out') {
          this.tokenService.clear();
          this.authService.logout('email');
          this.router.navigate(['home']);
          console.log('Log Out clicked');
        }
      });
  }
  ngOnDestroy(): void {
    this.clickhandler.unsubscribe();
  }
}
