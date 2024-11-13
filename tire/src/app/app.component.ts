import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbIconModule, NbLayoutModule, NbUserModule } from '@nebular/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NbLayoutModule, NbUserModule, NbIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tire';
}
