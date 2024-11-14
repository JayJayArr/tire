import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbIconModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { User } from './types';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NbLayoutModule, NbUserModule, NbIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tire';
  user = signal<User>({
    email: 'jakob.janus@nutz.com',
    role: 'user',
    cardno: '10234',
  });
}
