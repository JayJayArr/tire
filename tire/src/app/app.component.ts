import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
  NbUserModule,
} from '@nebular/theme';
import { User } from './types';
import { NbAuthJWTToken, NbAuthService, NbAuthToken } from '@nebular/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NbLayoutModule,
    NbUserModule,
    NbIconModule,
    NbButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  user: User = {
    email: 'login',
    cardno: '',
    role: '',
  };
  title = 'tire';

  constructor(
    private router: Router,
    private authService: NbAuthService,
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
        console.log(this.user);
      }
    });
  }

  onAvatar() {
    this.router.navigate(['/settings']);
  }
}
